import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class SystemService {
  /**
   * 图层
   */
  readonly layout = new BehaviorSubject([]);

  /**
   * 登录状态
   */
  readonly login = new BehaviorSubject(false);

  readonly refreshMenu = new Subject();

  refreshMenuStart(): void {
    this.refreshMenu.next(1);
  }
}
