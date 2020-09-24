import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { MainService } from './main.service';

@Injectable()
export class TokenService implements CanActivate {
  constructor(
    private mainService: MainService,
    private router: Router
  ) {
  }

  canActivate() {
    return this.mainService.verify().pipe(
      map((res: any) => {
        if (!res.error) {
          return true;
        }
        this.router.navigate(['/login']);
        return false;
      })
    );
  }
}
