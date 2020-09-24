import { Component, OnInit } from '@angular/core';
import { BitConfigService, BitService } from 'ngx-bit';
import { NzMessageService } from 'ng-zorro-antd';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  constructor(
    private bit: BitService,
    private message: NzMessageService,
    private config: BitConfigService
  ) {
  }

  ngOnInit() {
    this.config.setupLocales(import('./app.language'));
    this.config.setupHttpInterceptor(
      map(res => {
        if (res.error && res.msg === 'rbac invalid') {
          this.message.error(this.bit.l.rbacError);
        }
        return of(res);
      })
    );
  }
}
