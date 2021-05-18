import { ListByPage } from 'ngx-bit';
import { Observable } from 'rxjs';

export interface PageTableServiceInterface {
  lists(factory: ListByPage, refresh: boolean, persistence: boolean): Observable<any>;

  delete(id: any[]): Observable<any>;

  status(data: any): Observable<any>;
}

export interface PageTableColumnStyle {
  width?: string;
}

export type PageTableColumnFormat = 'i18n' | 'status' | 'action';

export interface PageTableColumn {
  key: string;
  style?: PageTableColumnStyle;
  format?: PageTableColumnFormat;
  extra?: any;
}
