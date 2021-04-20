import { Component, OnInit } from '@angular/core';
import { AsyncSubject } from 'rxjs';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchemaType } from '../schema-type';
import { BitService, BitSwalService } from 'ngx-bit';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SchemaService } from '../schema.service';
import { ActivatedRoute } from '@angular/router';
import * as packer from './language';
import { asyncValidator } from 'ngx-bit/operates';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'van-schema-edit',
  templateUrl: './schema-edit.component.html'
})
export class SchemaEditComponent implements OnInit {
  private id: number;
  private tableAsync: AsyncSubject<string> = new AsyncSubject();
  form: FormGroup;
  type: any[] = Object.values(SchemaType);

  constructor(
    public bit: BitService,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private swal: BitSwalService,
    private schemaService: SchemaService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.bit.registerLocales(packer);
    this.form = this.fb.group({
      name: this.fb.group(this.bit.i18nGroup({
        validate: {
          zh_cn: [Validators.required]
        }
      })),
      table: [null, [Validators.required], [this.existsTable]],
      type: [null, [Validators.required]],
      description: [null],
      status: [true, [Validators.required]]
    });
    this.route.params.subscribe(param => {
      this.id = param.id;
      this.getData();
    });
  }

  existsTable = (control: AbstractControl) => {
    return asyncValidator(this.schemaService.validedTable(control.value, this.tableAsync));
  };

  getData(): void {
    this.schemaService.get(this.id).subscribe(data => {
      const name = this.bit.i18nParse(data.name);
      this.tableAsync.next(data.table);
      this.tableAsync.complete();
      this.form.patchValue({
        name,
        table: data.table,
        type: data.type,
        description: data.description,
        status: data.status
      });
    });
  }

  /**
   * 提交
   */
  submit(data): void {
    Reflect.set(data, 'id', this.id);
    this.schemaService.edit(data).pipe(
      switchMap(res => this.swal.editAlert(res))
    ).subscribe((status) => {
      if (status) {
        this.getData();
      }
    });
  }
}
