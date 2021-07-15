import { Observable } from 'rxjs';

import { ListByPage } from 'ngx-bit';

export interface PageTableServiceInterface {
  lists?(factory: ListByPage, refresh: boolean, persistence: boolean): Observable<any>;

  delete?(id: any[]): Observable<any>;

  status?(data: any): Observable<any>;
}

export type PageTableColumnFormat = 'i18n' | 'date' | 'datetime' | 'status' | 'action';

export interface PageTableColumn {
  key: string;
  width?: string;
  left?: boolean;
  right?: boolean;
  align?: 'left' | 'right' | 'center';
  breakWord?: boolean;
  format?: PageTableColumnFormat;
  extra?: any;
}

export interface PageFormSchema {
  disabled?: boolean;
  weight?: number;
}
