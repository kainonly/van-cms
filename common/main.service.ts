import { Injectable } from '@angular/core';
import { BitHttpService } from 'ngx-bit';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MainService {
  protected model = 'main';

  constructor(
    protected http: BitHttpService
  ) {
  }

  /**
   * User Login
   */
  login(username: string, password: string): Observable<any> {
    return this.http.req(this.model + '/login', {
      username,
      password
    });
  }

  /**
   * User Logout
   */
  logout(): Observable<boolean> {
    return this.http.req(this.model + '/logout').pipe(
      map(res => !res.error)
    );
  }

  /**
   * Get Resource
   */
  resource(): Observable<any> {
    return this.http.req(this.model + '/resource').pipe(
      map(res => {
        const resource: object = {};
        const router: object = {};
        const nav: any = [];

        if (!res.error) {
          for (const x of res.data) {
            resource[x.key] = x;
            if (x.router === 1 || x.router === true) {
              router[x.key] = x;
            }
          }
          for (const x of res.data) {
            if (!x.nav) {
              continue;
            }
            if (x.parent === 'origin') {
              nav.push(x);
            } else {
              const parent = x.parent;
              if (resource.hasOwnProperty(parent)) {
                const rows = resource[parent];
                if (!rows.hasOwnProperty('children')) {
                  rows.children = [];
                }
                x.parentNode = rows;
                rows.children.push(x);
              }
            }
          }
          return { resource, nav, router };
        } else {
          return {};
        }
      })
    );
  }

  /**
   * Get Profile Information
   */
  information(): Observable<any> {
    return this.http.req(this.model + '/information').pipe(
      map(res => (!res.error ? res.data : {}))
    );
  }

  /**
   * Update Profile
   */
  update(data: any): Observable<any> {
    return this.http.req(this.model + '/update', data);
  }
}
