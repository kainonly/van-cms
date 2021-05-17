import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BitHttpService } from 'ngx-bit';

@Injectable()
export class TokenService implements CanActivate {

  constructor(
    protected http: BitHttpService,
    protected router: Router
  ) {
  }

  canActivate(): Observable<any> {
    return this.http.req('main/verify').pipe(
      map((res: any) => {
        if (res.error) {
          this.router.navigateByUrl('/login');
        }
        return true;
      })
    );
  }
}
