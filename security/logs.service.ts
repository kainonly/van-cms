import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BitCurdCommonService, ListByPage } from 'ngx-bit';

@Injectable()
export class LogsService {
  private model = 'logs';

  constructor(private curd: BitCurdCommonService) {}

  lists(factory: ListByPage, refresh: boolean, persistence: boolean): Observable<any> {
    return this.curd.lists(this.model, factory, {
      refresh,
      persistence
    });
  }
}
