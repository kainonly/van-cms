import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Api, BitService } from 'ngx-bit';

@Injectable()
export class RoleService {
  api: Api;

  constructor(private bit: BitService) {
    this.api = bit.api('role');
  }

  /**
   * 验证权限组索引是否存在
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
