import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AsyncSubject, Subscription } from 'rxjs';
import { switchMap, throttleTime } from 'rxjs/operators';

import { PermissionService } from '@vanx/framework/permission';
import { ResourceService } from '@vanx/framework/resource';
import { RoleService } from '@vanx/framework/role';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTreeComponent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { BitService } from 'ngx-bit';
import { asyncValidator } from 'ngx-bit/operates';
import { BitSwalService } from 'ngx-bit/swal';

import { UserService } from '../user.service';
import * as packer from './language';
import { validedPassword } from './valided-password';

@Component({
  selector: 'v-user-page',
  templateUrl: './user-page.component.html'
})
export class UserPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private id!: number;
  private dataAsync: AsyncSubject<void> = new AsyncSubject<void>();

  @ViewChild('nzTree') nzTree!: NzTreeComponent;
  private resource: string[] = [];
  nodes: NzTreeNodeOptions[] = [];
  form!: FormGroup;
  pwd = true;
  pwdMust = true;
  avatar = '';
  roleLists: any[] = [];
  permissionLists: any[] = [];

  private localeChanged!: Subscription;

  constructor(
    private swal: BitSwalService,
    private fb: FormBuilder,
    public bit: BitService,
    private notification: NzNotificationService,
    private userService: UserService,
    private roleService: RoleService,
    private resourceService: ResourceService,
    private permissionService: PermissionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userService.setModel('admin');
    this.bit.registerLocales(packer);
    this.form = this.fb.group({
      username: [
        null,
        [Validators.required, Validators.minLength(4), Validators.maxLength(20)],
        [this.validedUsername]
      ],
      password: [null, this.validedPassword],
      role: [null, [Validators.required]],
      permission: [[]],
      call: [null],
      email: [null, [Validators.email]],
      phone: [null],
      status: [true, [Validators.required]]
    });
    this.getRole();
    this.getNodes();
    this.getPermission();
    this.route.params.subscribe(param => {
      if (param.id) {
        this.id = param.id;
        this.getData();
      }
    });
    this.localeChanged = this.bit.localeChanged!.subscribe(() => {
      this.getNodes();
    });
  }

  validedUsername = (control: AbstractControl) => {
    return asyncValidator(this.userService.validedUsername(control.value));
  };
  validedPassword = (control: AbstractControl) => {
    if (!control.value) {
      return this.pwdMust ? { required: true } : null;
    }
    return validedPassword(control.value);
  };

  ngAfterViewInit(): void {
    this.dataAsync.pipe(throttleTime(200)).subscribe(() => {
      const resource = this.resource;
      const queue = [...this.nzTree.getTreeNodes()];
      while (queue.length !== 0) {
        const node = queue.pop()!;
        node.isChecked = resource.indexOf(node.key) !== -1;
        const parent = node.parentNode;
        if (parent) {
          parent.isChecked = parent.getChildren().every(v => resource.indexOf(v.key) !== -1);
          parent.isHalfChecked = !parent.isChecked && parent.getChildren().some(v => resource.indexOf(v.key) !== -1);
        }
        const children = node.getChildren();
        if (children.length !== 0) {
          queue.push(...children);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.localeChanged.unsubscribe();
  }

  getData(): void {
    this.pwdMust = false;
    this.form.get('username')!.disable();
    this.userService.api.get(this.id).subscribe((data: any) => {
      if (data.self) {
        this.swal
          .create({
            title: this.bit.l.auth,
            content: this.bit.l.selfTip,
            type: 'info',
            okText: this.bit.l.goProfile,
            cancelText: this.bit.l.back
          })
          .subscribe(status => {
            if (status) {
              this.bit.open(['profile']);
            } else {
              this.bit.back();
            }
          });
      }
      this.resource = data.resource ? data.resource.split(',') : [];
      this.dataAsync.next();
      this.dataAsync.complete();
      this.form.patchValue({
        username: data.username,
        role: data.role.split(','),
        permission: data.permission ? data.permission.split(',') : [],
        call: data.call,
        email: data.email,
        phone: data.phone,
        status: data.status
      });
    });
  }

  getRole(): void {
    this.roleService.api.originLists().subscribe((data: any) => {
      this.roleLists = data;
    });
  }

  getNodes(): void {
    this.resourceService.api.originLists().subscribe((data: any) => {
      const refer: Map<string, NzTreeNodeOptions> = new Map();
      const lists = data.map((v: any) => {
        const rows = {
          title: `${JSON.parse(v.name)[this.bit.locale!]}[${v.key}]`,
          key: v.key,
          parent: v.parent,
          children: [],
          isLeaf: true
        };
        refer.set(v.key, rows);
        return rows;
      });
      const nodes: any[] = [];
      for (const x of lists) {
        if (x.parent === 'origin') {
          nodes.push(x);
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
      this.nodes = nodes;
    });
  }

  /**
   * 获取资源键
   */
  setResource(): void {
    this.resource = [];
    const queue = [...this.nzTree.getTreeNodes()];
    while (queue.length !== 0) {
      const node = queue.pop()!;
      if (node.isChecked || node.isHalfChecked) {
        this.resource.push(node.key);
      }
      const children = node.getChildren();
      if (children.length !== 0) {
        queue.push(...children);
      }
    }
  }

  /**
   * 全部选中
   */
  allChecked(): void {
    this.allCheckedStatus(true);
  }

  /**
   * 取消选中
   */
  allUnchecked(): void {
    this.allCheckedStatus(false);
  }

  /**
   * 设置展开状态
   */
  private allCheckedStatus(status: boolean): void {
    const queue = [...this.nzTree.getTreeNodes()];
    while (queue.length !== 0) {
      const node = queue.pop()!;
      node.isHalfChecked = false;
      node.isChecked = status;
      const children = node.getChildren();
      if (children.length !== 0) {
        queue.push(...children);
      }
    }
    this.nzTree.nzCheckBoxChange.emit();
  }

  /**
   * 全部展开
   */
  allExpand(): void {
    this.allExpandStatus(true);
  }

  /**
   * 全部关闭
   */
  allClose(): void {
    this.allExpandStatus(false);
  }

  private allExpandStatus(status: boolean): void {
    const queue = [...this.nzTree.getTreeNodes()];
    while (queue.length !== 0) {
      const node = queue.pop()!;
      node.isExpanded = status;
      const children = node.getChildren();
      if (children.length !== 0) {
        queue.push(...children);
      }
    }
  }

  getPermission(): void {
    this.permissionService.api.originLists().subscribe((data: any) => {
      this.permissionLists = data;
    });
  }

  upload(info: any): void {
    if (info.type === 'success') {
      this.avatar = info.file.response.data.save_name;
      this.notification.success(this.bit.l.success, this.bit.l.uploadSuccess);
    }
    if (info.type === 'error') {
      this.notification.error(this.bit.l.notice, this.bit.l.uploadError);
    }
  }

  submit = (data: any): void => {
    Reflect.set(data, 'resource', this.resource);
    if (this.avatar) {
      Reflect.set(data, 'avatar', this.avatar);
    }
    if (!this.id) {
      this.userService.api
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
      this.userService.api
        .edit(data)
        .pipe(switchMap((v: any) => this.swal.editAlert(v)))
        .subscribe(status => {
          if (status) {
            this.form.reset();
            this.getData();
          }
        });
    }
  };
}
