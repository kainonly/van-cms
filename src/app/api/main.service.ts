import {Injectable} from '@angular/core';
import {HttpService} from 'ngx-bit';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class MainService {
  private model = 'main';

  constructor(
    private http: HttpService
  ) {
  }

  /**
   * Login
   */
  login(username: string, password: string): Observable<any> {
    return this.http.req(this.model + '/login', {
      username,
      password
    });
  }

  /**
   * logout
   */
  logout(): Observable<boolean> {
    return this.http.req(this.model + '/logout').pipe(
      map(res => !res.error)
    );
  }

  /**
   * Token Verify
   */
  verify(): Observable<any> {
    return this.http.req(this.model + '/verify');
  }

  /**
   * get menu data
   */
  menu(): Observable<any> {
    return this.http.req(this.model + '/menu').pipe(
      map(res => {
        const menu: any = {};
        const nav = [];
        const router: any = {};
        if (!res.error) {
          for (const x of res.data) {
            menu[x.id] = x;
            if (x.routerlink) {
              router[x.routerlink] = x;
            }
          }
          for (const x of res.data) {
            if (!x.nav) {
              continue;
            }
            if (x.parent === 0) {
              nav.push(x);
            } else {
              const parent = x.parent;
              if (menu.hasOwnProperty(parent)) {
                const rows = menu[parent];
                if (!rows.hasOwnProperty('children')) {
                  rows.children = [];
                }
                rows.children.push(x);
              }
            }
          }

          return {menu, nav, router};
        } else {
          return {};
        }
      })
    );
  }

  /**
   * get information
   */
  information(): Observable<any> {
    return this.http.req(this.model + '/information').pipe(
      map(res => !res.error ? res.data : {})
    );
  }

  /**
   * update profile
   */
  update(data: any): Observable<any> {
    return this.http.req(this.model + '/update', data);
  }
}
