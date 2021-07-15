import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AsyncSubject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AppService } from '@vanx/framework';
import { NzTreeNodeOptions } from 'ng-zorro-antd/core/tree/nz-tree-base-node';
import { BitService } from 'ngx-bit';
import { asyncValidator } from 'ngx-bit/operates';
import { BitSwalService } from 'ngx-bit/swal';

import { ResourceService } from '../resource.service';
import * as packer from './language';

@Component({
  selector: 'v-resource-page',
  templateUrl: './resource-page.component.html'
})
export class ResourcePageComponent implements OnInit, OnDestroy {
  private id!: number;
  private keyAsync!: AsyncSubject<any>;

  form!: FormGroup;
  parentId!: number;
  parentLists: any[] = [];

  private localeChanged!: Subscription;

  constructor(
    public bit: BitService,
    private fb: FormBuilder,
    private swal: BitSwalService,
    private resourceService: ResourceService,
    private route: ActivatedRoute,
    private app: AppService
  ) {}

  ngOnInit(): void {
    this.bit.registerLocales(packer);
    this.form = this.fb.group({
      name: this.fb.group(
        this.bit.i18nGroup({
          validate: {
            zh_cn: [Validators.required],
            en_us: []
          }
        })
      ),
      key: [null, [Validators.required], [this.existsKey]],
      parent: [null, [Validators.required]],
      nav: [false, [Validators.required]],
      router: [false, [Validators.required]],
      policy: [false, [Validators.required]],
      icon: [null],
      status: [true, [Validators.required]]
    });
    this.route.params.subscribe(params => {
      if (params.parentId) {
        this.parentId = parseInt(params.parentId, 0);
      }
      if (params.id) {
        this.id = params.id;
        this.getData();
      }
      this.getParentNodes();
    });
    this.localeChanged = this.bit.localeChanged!.subscribe(() => {
      this.getParentNodes();
    });
  }

  ngOnDestroy(): void {
    this.localeChanged.unsubscribe();
  }

  existsKey = (control: AbstractControl) => {
    return asyncValidator(this.resourceService.validedKey(control.value, this.keyAsync));
  };

  getData(): void {
    this.keyAsync = new AsyncSubject();
    this.resourceService.api.get(this.id).subscribe(data => {
      if (!data) {
        return;
      }
      this.keyAsync.next(data.key);
      this.keyAsync.complete();
      this.form.setValue({
        name: JSON.parse(data.name as string),
        key: data.key,
        parent: data.parent,
        nav: data.nav,
        router: data.router,
        policy: data.policy,
        icon: data.icon,
        status: data.status
      });
    });
  }

  getParentNodes(): void {
    this.resourceService.api.originLists().subscribe((data: any) => {
      const refer: Map<string, NzTreeNodeOptions> = new Map();
      const lists = data.map((v: any) => {
        if (this.parentId && v.id === this.parentId) {
          this.form.get('parent')!.setValue(v.key);
        }
        const rows = {
          title: `${JSON.parse(v.name)[this.bit.locale!]} [${v.key}]`,
          key: v.key,
          id: v.id,
          parent: v.parent,
          children: [],
          isLeaf: true
        };
        refer.set(v.key, rows);
        return rows;
      });
      const nodes: any[] = [
        {
          key: 'origin',
          title: {
            zh_cn: '最高级',
            en_us: 'Top'
          }[this.bit.locale!],
          isLeaf: true
        }
      ];
      for (const x of lists) {
        if (x.parent === 'origin') {
          nodes.push(refer.get(x.key));
        } else {
          const parent = x.parent;
          if (refer.has(parent)) {
            const rows = refer.get(parent)!;
            rows.isLeaf = false;
            rows.children!.push(x);
            refer.set(parent, rows);
          }
        }
      }
      this.parentLists = nodes;
    });
  }

  submit = (data: any): void => {
    if (!this.id) {
      this.resourceService.api
        .add(data)
        .pipe(
          switchMap((v: any) =>
            this.swal.addAlert(v, this.form, {
              nav: false,
              router: false,
              policy: false,
              status: true
            })
          )
        )
        .subscribe(status => {
          if (status) {
            this.getParentNodes();
          }
          this.app.refreshMenuStart();
        });
    } else {
      Reflect.set(data, 'id', this.id);
      this.resourceService.api
        .edit(data)
        .pipe(switchMap((v: any) => this.swal.editAlert(v)))
        .subscribe(status => {
          if (status) {
            this.getParentNodes();
          }
          this.app.refreshMenuStart();
        });
    }
  };
}
