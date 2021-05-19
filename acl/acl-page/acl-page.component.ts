import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BitSwalService, BitService } from 'ngx-bit';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { asyncValidator } from 'ngx-bit/operates';
import { ActivatedRoute } from '@angular/router';
import { AsyncSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AclService } from '../acl.service';
import * as packer from './language';

@Component({
  selector: 'v-acl-page',
  templateUrl: './acl-page.component.html'
})
export class AclPageComponent implements OnInit {
  private id: number;
  private keyAsync: AsyncSubject<any>;

  form: FormGroup;
  readonly default: any = {
    read: ['get', 'originLists', 'lists'],
    write: ['add', 'edit', 'delete']
  };

  constructor(
    public bit: BitService,
    private fb: FormBuilder,
    private swal: BitSwalService,
    private aclService: AclService,
    private notification: NzNotificationService,
    private route: ActivatedRoute
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
      read: [this.default.read],
      write: [this.default.write],
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
    return asyncValidator(this.aclService.validedKey(control.value, this.keyAsync));
  };

  getData(): void {
    this.keyAsync = new AsyncSubject();
    this.aclService.get(this.id).subscribe(data => {
      const name = this.bit.i18nParse(data.name);
      this.keyAsync.next(data.key);
      this.keyAsync.complete();
      const write = !data.write ? [] : data.write.split(',');
      const read = !data.read ? [] : data.read.split(',');
      this.form.patchValue({
        name,
        key: data.key,
        write,
        read,
        status: data.status
      });
    });
  }

  submit = (data): void => {
    if (!this.id) {
      this.aclService.add(data).pipe(
        switchMap(res =>
          this.swal.addAlert(res, this.form, {
            status: true
          })
        )
      ).subscribe(() => {
      });
    } else {
      Reflect.set(data, 'id', this.id);
      this.aclService.edit(data).pipe(
        switchMap(res => this.swal.editAlert(res))
      ).subscribe(status => {
        if (status) {
          this.getData();
        }
      });
    }
  };
}
