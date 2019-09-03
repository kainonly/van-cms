import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd';
import {MainService} from '@common/main.service';
import {BitService} from 'ngx-bit';
import packer from './language';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private mainService: MainService,
    private notification: NzNotificationService,
    private router: Router,
    private fb: FormBuilder,
    public bit: BitService
  ) {
  }

  ngOnInit() {
    this.bit.registerLocales(packer);
    this.form = this.fb.group({
      username: [null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(18)]
      ],
      remember: [true, [
        Validators.required
      ]]
    });
  }

  submit(data: any) {
    this.mainService.login(data.username, data.password).subscribe(res => {
      if (!res.error) {
        this.notification.success(
          this.bit.l.loginTips,
          this.bit.l.loginSuccess
        );
        this.router.navigateByUrl('/');
      } else {
        this.notification.error(
          this.bit.l.loginTips,
          this.bit.l.loginFailed
        );
      }
    });
  }
}
