import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AsyncSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BitService } from 'ngx-bit';
import { asyncValidator } from 'ngx-bit/operates';
import { BitSwalService } from 'ngx-bit/swal';

import { PermissionService } from '../permission.service';
import * as packer from './language';

@Component({
  selector: 'v-permission-page',
  templateUrl: './permission-page.component.html'
})
export class PermissionPageComponent implements OnInit {
  private id!: number;
  private keyAsync!: AsyncSubject<any>;
  form!: FormGroup;

  constructor(
    public bit: BitService,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private swal: BitSwalService,
    private permissionService: PermissionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.bit.registerLocales(packer);
    this.form = this.fb.group({
      name: this.fb.group(
        this.bit.i18nGroup({
          validate: {
            zh_cn: [Validators.required],
            en_us: [Validators.required]
          }
        })
      ),
      key: [null, [Validators.required], [this.existsKey]],
      note: [null],
      status: [true, [Validators.required]]
    });
    this.route.params.subscribe(param => {
      if (param.id) {
        this.id = param.id;
        this.getData();
      }
    });
  }

  existsKey = (control: AbstractControl) => {
    return asyncValidator(this.permissionService.validedKey(control.value, this.keyAsync));
  };

  getData(): void {
    this.keyAsync = new AsyncSubject();
    this.permissionService.api.get(this.id).subscribe((data: any) => {
      const name = this.bit.i18nData(data.name);
      this.keyAsync.next(data.key);
      this.keyAsync.complete();
      this.form.patchValue({
        name,
        key: data.key,
        note: data.note,
        status: data.status
      });
    });
  }

  submit = (data: any): void => {
    if (!this.id) {
      this.permissionService.api
        .add(data)
        .pipe(
          switchMap((v: any) =>
            this.swal.addAlert(v, this.form, {
              status: true
            })
          )
        )
        .subscribe(() => {});
    } else {
      Reflect.set(data, 'id', this.id);
      this.permissionService.api
        .edit(data)
        .pipe(switchMap((v: any) => this.swal.editAlert(v)))
        .subscribe(status => {
          if (status) {
            this.getData();
          }
        });
    }
  };
}
