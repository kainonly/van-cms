import {Injectable} from '@angular/core';
import {HttpService} from 'ngx-bit';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class CenterService {
  private model = 'center';

  constructor(
    private http: HttpService
  ) {
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
