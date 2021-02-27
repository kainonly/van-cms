import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SystemService {
  /**
   * 图层
   */
  layout = new BehaviorSubject([]);

  /**
   * 登录状态
   */
  login = new BehaviorSubject(false);
}
