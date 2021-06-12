import { ElementRef, Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class SystemService {
  /**
   * 内容节点
   */
  readonly content: AsyncSubject<ElementRef> = new AsyncSubject();

  /**
   * 登录状态
   */
  readonly login = new BehaviorSubject(false);

  readonly refreshMenu = new Subject();

  refreshMenuStart(): void {
    this.refreshMenu.next(1);
  }
}
