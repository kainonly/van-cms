import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Api, BitService } from 'ngx-bit';

@Injectable()
export class UserService {
  api!: Api;

  constructor(private bit: BitService) {}

  setModel(name: string) {
    this.api = this.bit.api(name);
  }

  /**
   * 验证用户名是否存在
   */
  validedUsername(username: string): Observable<any> {
    return this.api
      .send(`validedUsername`, {
        username
      })
      .pipe(
        map((v: any) => {
          if (v.error === 1) {
            return false;
          }
          return !v.data.exists;
        })
      );
  }
}
