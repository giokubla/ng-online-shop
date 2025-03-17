import { HttpParams } from '@angular/common/http';

export function buildParamsFromQuery(queryObject: object) {
  let params = new HttpParams();
  Object.keys(queryObject).forEach((key) => {
    const value = queryObject[key as keyof typeof queryObject];
    if (key && value) {
      params = params.append(key, value);
    } else {
      params = params.delete(key);
    }
  });
  return params;
}
