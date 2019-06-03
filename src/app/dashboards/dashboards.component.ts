import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BitService, EventsService, StorageService} from 'ngx-bit';
import {NzNotificationService} from 'ng-zorro-antd';
import {MainService} from '../api/main.service';
import {CenterService} from '../api/center.service';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss'],
})
export class DashboardsComponent implements OnInit, OnDestroy {
  collapsed = false;
  navLists: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mainService: MainService,
    private centerService: CenterService,
    private events: EventsService,
    private storage: StorageService,
    private notification: NzNotificationService,
    public bit: BitService
  ) {
  }

  ngOnInit() {
    this.getMenuLists();
    this.storage.autoBreadcrumb(this.router);
    this.events.on('locale').subscribe(locale => {
      this.bit.locale = locale;
    });
    this.events.on('refresh-menu').subscribe(() => {
      this.getMenuLists();
    });
  }

  ngOnDestroy() {
    this.events.off('refresh-menu');
    this.storage.destoryBreadcrumb();
  }

  /**
   * 获取菜单数据
   */
  private getMenuLists() {
    this.mainService.menu().subscribe(data => {
      this.storage.setMenu(data.menu, data.router);
      this.navLists = data.nav;
    });
  }

  /**
   * 注销登录
   */
  logout() {
    this.centerService.logout().subscribe(() => {
      this.bit.breadcrumb = [];
      this.bit.navActive = [];
      this.storage.clear();
      this.storage.destoryBreadcrumb();
      this.router.navigateByUrl('/login');
      this.notification.success(this.bit.l.logout, this.bit.l.logoutSuccess);
    });
  }
}
