import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Api, BitService } from 'ngx-bit';

@Injectable()
export class AclService {
  api: Api;

  constructor(private bit: BitService) {
    this.api = bit.api('api');
  }

  /**
   * 验证 ACL 索引
   */
  validedKey(key: string, edit: Observable<any> = of(null)): Observable<any> {
    return edit.pipe(
      switchMap(editKey => {
        if (key !== editKey) {
          return this.api.send(`/validedKey`, {
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
      map((res: any) => {
        if (res.error === 1) {
          return false;
        }
        return !res.data.exists;
      })
    );
  }
}
