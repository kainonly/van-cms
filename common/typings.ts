import { ListByPage } from 'ngx-bit';
import { Observable } from 'rxjs';
import { TemplateRef } from '@angular/core';

export interface PageTableServiceInterface {
  lists(factory: ListByPage, refresh: boolean, persistence: boolean): Observable<any>;

  delete(id: any[]): Observable<any>;

  status(data: any): Observable<any>;
}

export type PageTableFormat = 'i18n' | 'status' | 'action';

export interface PageTableColumn {
  name: string;
  key?: string;
  width?: string;
  template?: TemplateRef<any>;
  format?: PageTableFormat;
  edit?: string;
}
