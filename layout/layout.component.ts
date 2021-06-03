import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef,
  ElementRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BitService } from 'ngx-bit';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subscription, timer } from 'rxjs';
import { MainService, SystemService } from '@vanx/framework';
import { BitRouterService } from 'ngx-bit/router';

@Component({
  selector: 'v-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  @ViewChild('header') header: ElementRef;
  @ViewChild('warpper') warpper: ElementRef;

  collapsed = false;
  navLists: any[] = [];

  private refreshMenu: Subscription;
  private statusSubscription: Subscription;
  private firstDispatch = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private system: SystemService,
    private mainService: MainService,
    private notification: NzNotificationService,
    public bitRouter: BitRouterService,
    public bit: BitService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

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
    // timer(this.firstDispatch ? 150 : 0).subscribe(() => {
    //   const node = this.warpper.nativeElement;
    //   let sibling = node.previousElementSibling;
    //   const container = [this.header.nativeElement];
    //   while (sibling) {
    //     container.push(sibling);
    //     sibling = sibling.previousElementSibling;
    //   }
    //   this.system.layout.next(container);
    // });
    // this.firstDispatch = false;
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
