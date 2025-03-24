import {
  Component,
  computed,
  DestroyRef,
  inject,
  output,
  signal,
} from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { CartService } from '../../core/services/cart.service';
import { FormsModule } from '@angular/forms';
import { catchError, tap } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
  NzDrawerComponent,
  NzDrawerContentDirective,
} from 'ng-zorro-antd/drawer';
import { NzSkeletonComponent } from 'ng-zorro-antd/skeleton';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { CurrencyPipe } from '@angular/common';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-cart',
  imports: [
    NzIconModule,
    NzListModule,
    FormsModule,
    NzDrawerComponent,
    NzSkeletonComponent,
    NzInputNumberComponent,
    NzCardComponent,
    NzDrawerContentDirective,
    CurrencyPipe,
    NzButtonComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartService = inject(CartService);
  destroyRef$ = inject(DestroyRef);
  loader = signal(false);
  nzNotificationService = inject(NzNotificationService);
  cart = this.cartService.cartResource;
  discount = computed(() =>
    Math.round(
      (this.cart.value()?.total?.price?.beforeDiscount ?? 0) -
        (this.cart.value()?.total?.price?.current ?? 0),
    ),
  );
  close = output();

  onQuantityChange(quantity: number, id: string) {
    if (quantity) {
      this.loader.set(true);
      this.cartService
        .patchCard({ id, quantity })
        .pipe(
          tap(() => {
            this.loader.set(false);
          }),
          takeUntilDestroyed(this.destroyRef$),
        )
        .subscribe();
    }
  }

  onDelete(id: string) {
    this.loader.set(true);
    this.cartService
      .delete({ id })
      .pipe(
        tap(() => {
          this.loader.set(false);
        }),
      )
      .subscribe();
  }
  checkOut() {
    this.cartService.cartCheckOut().subscribe({
      next: () => this.close.emit(),
      error: (err) => err,
    });
  }
}
