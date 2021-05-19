import { Component, ContentChildren, OnInit, QueryList, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BitSwalService, BitService } from 'ngx-bit';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { asyncValidator } from 'ngx-bit/operates';
import { PageFormComponent, PageFormItemDirective } from '@vanx/framework/component';
import { AclService } from '../acl.service';
import * as packer from './language';

@Component({
  selector: 'v-acl-add',
  templateUrl: './acl-add.component.html'
})
export class AclAddComponent implements OnInit {
  form: FormGroup;
  writeLists: string[] = ['add', 'edit', 'delete'];
  readLists: string[] = ['get', 'originLists', 'lists'];
  @ViewChild('pf') pf: PageFormComponent;
  @ContentChildren(PageFormItemDirective) items: QueryList<PageFormItemDirective>;

  constructor(
    public bit: BitService,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private swal: BitSwalService,
    private aclService: AclService
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
      write: [this.writeLists],
      read: [this.readLists],
      status: [true, [Validators.required]]
    });
  }

  existsKey = (control: AbstractControl) => {
    return asyncValidator(this.aclService.validedKey(control.value));
  };

  submit(data): void {
    console.log(data);
    // this.aclService.add(data).pipe(
    //   switchMap(res =>
    //     this.swal.addAlert(res, this.form, {
    //       status: true
    //     })
    //   )
    // ).subscribe(() => {
    // });
  }
}
