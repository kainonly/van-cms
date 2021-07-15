import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Api, BitService } from 'ngx-bit';

@Injectable()
export class ResourceService {
  api: Api;

  constructor(private bit: BitService) {
    this.api = bit.api('resource');
  }

  /**
   * 资源排序
   */
  sort(data: any[]): Observable<any> {
    return this.api.send(`sort`, {
      data
    });
  }

  /**
   * 验证资源索引是否存在
   */
  validedKey(key: string, edit: Observable<any> = of(null)): Observable<any> {
    return edit.pipe(
      switchMap(editKey => {
        if (key !== editKey) {
          return this.api.send(`validedKey`, {
            key
          });
        }
        return of({
          error: 0,
          data: {
            exists: false
          }
        });
      }),
      map((v: any) => {
        if (v.error === 1) {
          return false;
        }
        return !v.data.exists;
      })
    );
  }
}
