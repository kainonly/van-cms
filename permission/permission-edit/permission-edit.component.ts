import { Component, OnInit } from '@angular/core';
import { BitSwalService, BitService } from 'ngx-bit';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { asyncValidator } from 'ngx-bit/operates';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AsyncSubject } from 'rxjs';
import { PermissionService } from '../permission.service';
import * as packer from './language';

@Component({
  selector: 'v-permission-edit',
  templateUrl: './permission-edit.component.html'
})
export class PermissionEditComponent implements OnInit {
  private id: number;
  private keyAsync: AsyncSubject<string> = new AsyncSubject();
  form: FormGroup;

  constructor(
    public bit: BitService,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private swal: BitSwalService,
    private route: ActivatedRoute,
    private permissionService: PermissionService
  ) {
  }

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
      note: [],
      status: [true, [Validators.required]]
    });
    this.route.params.subscribe(param => {
      this.id = param.id;
      this.getData();
    });
  }

  existsKey = (control: AbstractControl) => {
    return asyncValidator(this.permissionService.validedKey(control.value, this.keyAsync));
  };

  getData(): void {
    this.permissionService.get(this.id).subscribe(data => {
      const name = this.bit.i18nParse(data.name);
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

  /**
   * 提交
   */
  submit(data): void {
    Reflect.set(data, 'id', this.id);
    this.permissionService.edit(data).pipe(
      switchMap(res => this.swal.editAlert(res))
    ).subscribe(status => {
      if (status) {
        this.getData();
      }
    });
  }
}
