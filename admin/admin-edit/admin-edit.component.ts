import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BitSwalService, BitService, BitEventsService } from 'ngx-bit';
import { switchMap } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ActivatedRoute } from '@angular/router';
import { NzTreeComponent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { RoleService } from '@vanx/framework/role';
import { PermissionService } from '@vanx/framework/permission';
import { ResourceService } from '@vanx/framework/resource';
import { AdminService } from '../admin.service';
import * as packer from './language';

import { AsyncSubject } from 'rxjs';

@Component({
  selector: 'v-admin-edit',
  templateUrl: './admin-edit.component.html'
})
export class AdminEditComponent implements OnInit, AfterViewInit {
  @ViewChild('nzTree', { static: true }) nzTree: NzTreeComponent;
  private id: number;
  private resource: string[] = [];
  private dataAsync: AsyncSubject<void> = new AsyncSubject<void>();
  nodes: NzTreeNodeOptions[] = [];
  form: FormGroup;
  username: string;
  avatar = '';
  roleLists: any[] = [];
  permissionLists: any[] = [];

  constructor(
    private swal: BitSwalService,
    private fb: FormBuilder,
    public bit: BitService,
    private events: BitEventsService,
    private route: ActivatedRoute,
    private notification: NzNotificationService,
    private adminService: AdminService,
    private roleService: RoleService,
    private resourceService: ResourceService,
    private permissionService: PermissionService
  ) {
  }

  ngOnInit(): void {
    this.bit.registerLocales(packer);
    this.form = this.fb.group({
      password: [null, [this.validedPassword]],
      password_check: [null, [this.checkPassword]],
      role: [null, [Validators.required]],
      permission: [[]],
      call: [null],
      email: [null, [Validators.email]],
      phone: [null],
      status: [true, [Validators.required]]
    });
    this.events.on('locale').subscribe(() => {
      this.getNodes();
    });
    this.route.params.subscribe(param => {
      this.id = param.id;
      this.getData();
      this.getRole();
      this.getNodes();
      this.getPermission();
    });
  }

  ngAfterViewInit(): void {
    this.dataAsync.subscribe(() => {
      setTimeout(() => {
        const resource = this.resource;
        const queue = [...this.nzTree.getTreeNodes()];
        while (queue.length !== 0) {
          const node = queue.pop();
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
      }, 200);
    });
  }

  validedPassword = (control: AbstractControl) => {
    if (control.parent === undefined) {
      return;
    }
    if (!control.value) {
      return;
    }
    control.parent.get('password_check').updateValueAndValidity();
    const value = control.value;
    const len = value.length;
    if (len < 12) {
      return { min: true, error: true };
    }
    if (len > 20) {
      return { max: true, error: true };
    }
    if (value.match(/^(?=.*[a-z])[\w|@$!%*?&-+]+$/) === null) {
      return { lowercase: true, error: true };
    }
    if (value.match(/^(?=.*[A-Z])[\w|@$!%*?&-+]+$/) === null) {
      return { uppercase: true, error: true };
    }
    if (value.match(/^(?=.*[0-9])[\w|@$!%*?&-+]+$/) === null) {
      return { number: true, error: true };
    }
    if (value.match(/^(?=.*[@$!%*?&-+])[\w|@$!%*?&-+]+$/) === null) {
      return { symbol: true, error: true };
    }
    return null;
  };

  checkPassword = (control: AbstractControl) => {
    if (control.parent === undefined) {
      return;
    }
    if (!control.value) {
      return;
    }
    const password = control.parent.get('password').value;
    if (control.value !== password) {
      return { correctly: true, error: true };
    }
    return null;
  };

  /**
   * 获取数据
   */
  getData(): void {
    this.adminService.get(this.id).subscribe(data => {
      if (data.self) {
        this.swal.create({
          title: this.bit.l.auth,
          content: this.bit.l.selfTip,
          type: 'info',
          okText: this.bit.l.goProfile,
          cancelText: this.bit.l.back
        }).subscribe((status) => {
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
      this.username = data.username;
      this.form.patchValue({
        role: data.role.split(','),
        permission: data.permission ? data.permission.split(',') : [],
        call: data.call,
        email: data.email,
        phone: data.phone,
        status: data.status
      });
    });
  }

  /**
   * 获取权限组
   */
  getRole(): void {
    this.roleService.originLists().subscribe(data => {
      this.roleLists = data;
    });
  }

  /**
   * 获取资源策略节点
   */
  getNodes(): void {
    this.resourceService.originLists().subscribe(data => {
      const refer: Map<string, NzTreeNodeOptions> = new Map();
      const lists = data.map(v => {
        const rows = {
          title: JSON.parse(v.name)[this.bit.locale] + '[' + v.key + ']',
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
            const rows = refer.get(parent);
            rows.isLeaf = false;
            rows.children.push(x);
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
      const node = queue.pop();
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
      const node = queue.pop();
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

  /**
   * 设置展开状态
   */
  private allExpandStatus(status: boolean): void {
    const queue = [...this.nzTree.getTreeNodes()];
    while (queue.length !== 0) {
      const node = queue.pop();
      node.isExpanded = status;
      const children = node.getChildren();
      if (children.length !== 0) {
        queue.push(...children);
      }
    }
  }

  /**
   * 获取特殊授权
   */
  getPermission(): void {
    this.permissionService.originLists().subscribe(data => {
      this.permissionLists = data;
    });
  }

  /**
   * 上传
   */
  upload(info): void {
    if (info.type === 'success') {
      this.avatar = info.file.response.data.save_name;
      this.notification.success(this.bit.l.success, this.bit.l.uploadSuccess);
    }
    if (info.type === 'error') {
      this.notification.error(this.bit.l.notice, this.bit.l.uploadError);
    }
  }

  /**
   * 提交
   */
  submit(data): void {
    Reflect.set(data, 'id', this.id);
    Reflect.deleteProperty(data, 'password_check');
    Reflect.set(data, 'resource', this.resource);
    Reflect.set(data, 'avatar', this.avatar);
    this.adminService.edit(data).pipe(
      switchMap(res => this.swal.editAlert(res))
    ).subscribe(status => {
      if (status) {
        this.form.reset();
        this.getData();
      }
    });
  }
}
