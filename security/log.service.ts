import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BitHttpService, ListByPage } from 'ngx-bit';

@Injectable()
export class LogService {
  protected model: string;

  constructor(
    protected http: BitHttpService
  ) {
  }

  setModel(value: string): void {
    this.model = value;
  }

  lists(factory: ListByPage, refresh: boolean, persistence: boolean): Observable<any> {
    return this.http.lists(this.model, factory, {
      refresh,
      persistence
    });
  }
}
