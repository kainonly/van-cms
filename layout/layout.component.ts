import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';

import { MainService, LayoutService } from '@vanx/framework';
import { NzContentComponent } from 'ng-zorro-antd/layout';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BitService } from 'ngx-bit';
import { BitRouterService } from 'ngx-bit/router';

@Component({
  selector: 'v-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  @ViewChild('header') header!: ElementRef;
  @ViewChild('warpper') warpper!: ElementRef;
  @ViewChild(NzContentComponent) content!: NzContentComponent;

  collapsed = false;
  navLists: any[] = [];

  private refreshMenu!: Subscription;
  private statusSubscription!: Subscription;
  private firstDispatch = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private system: LayoutService,
    private mainService: MainService,
    private notification: NzNotificationService,
    public bitRouter: BitRouterService,
    public bit: BitService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.bit.registerLocales({});
    this.getMenuLists();
    this.bitRouter.setup();
    this.refreshMenu = this.system.refreshMenu.subscribe(() => {
      this.getMenuLists();
    });
    this.statusSubscription = this.bitRouter.changed.subscribe(() => {
      this.changeDetectorRef.detectChanges();
      this.dispatch();
    });
  }

  ngOnDestroy(): void {
    this.refreshMenu.unsubscribe();
    this.statusSubscription.unsubscribe();
  }

  /**
   * Get Menu Lists
   */
  private getMenuLists(): void {
    this.mainService.resource().subscribe(data => {
      this.bitRouter.setData({
        resource: data.resource,
        router: data.router
      });
      this.navLists = data.nav;
    });
  }

  private dispatch(): void {
    timer(300).subscribe(() => {
      this.system.content.next(this.content['elementRef']);
      this.system.content.complete();
    });
  }

  /**
   * User logout
   */
  logout(): void {
    this.mainService.logout().subscribe(() => {
      this.bit.clear();
      this.bitRouter.uninstall();
      this.router.navigateByUrl('/login');
      this.notification.info(this.bit.l.auth, this.bit.l.authLogout);
    });
  }
}
