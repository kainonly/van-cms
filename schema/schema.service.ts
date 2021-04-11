import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { BitHttpService } from 'ngx-bit';
import { ListByPage } from 'ngx-bit/factory';

@Injectable()
export class SchemaService {
  private model = 'schema';

  constructor(
    private http: BitHttpService
  ) {
  }

  originLists(type: any): Observable<any> {
    return this.http.originLists(this.model, [{ field: 'type', op: '=', value: type }]);
  }

  lists(factory: ListByPage, refresh: boolean, persistence: boolean): Observable<any> {
    return this.http.lists(this.model, factory, {
      refresh,
      persistence
    });
  }

  add(data: any): Observable<any> {
    return this.http.add(this.model, data);
  }

  get(id: any): Observable<any> {
    return this.http.get(this.model, id);
  }

  edit(data: any): Observable<any> {
    return this.http.edit(this.model, data);
  }

  delete(id: any[]): Observable<any> {
    return this.http.delete(this.model, id);
  }

  status(data: any): Observable<any> {
    return this.http.status(this.model, data);
  }

  setFields(id: any, fields: any[]): Observable<any> {
    return this.http.req(this.model + '/setFields', {
      id,
      fields
    });
  }

  validedTable(table: string, edit: Observable<string> = of(null)): Observable<any> {
    return edit.pipe(
      switchMap(editKey => {
        if (table !== editKey) {
          return this.http.req(this.model + '/validedTable', {
            table
          });
        }
        return of({
          error: 0,
          data: {
            exists: false
          }
        });
      }),
      map(res => {
        if (res.error === 1) {
          return false;
        }
        return !res.data.exists;
      })
    );
  }
}
