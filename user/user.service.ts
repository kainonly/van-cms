import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BitCurdCommonService, BitHttpService, ListByPage } from 'ngx-bit';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
  private model: string;

  constructor(
    private http: BitHttpService,
    private curd: BitCurdCommonService
  ) {
  }

  setModel(value: string): void {
    this.model = value;
  }

  originLists(): Observable<any> {
    return this.curd.originLists(this.model);
  }

  lists(factory: ListByPage, refresh: boolean, persistence: boolean): Observable<any> {
    return this.curd.lists(this.model, factory, {
      refresh,
      persistence
    });
  }

  get(id: any): Observable<any> {
    return this.curd.get(this.model, id);
  }

  add(data: any): Observable<any> {
    return this.curd.add(this.model, data);
  }

  edit(data: any): Observable<any> {
    return this.curd.edit(this.model, data);
  }

  delete(id: any[]): Observable<any> {
    return this.curd.delete(this.model, id);
  }

  status(data: any): Observable<any> {
    return this.curd.status(this.model, data);
  }

  /**
   * Validate Username
   */
  validedUsername(username: string): Observable<any> {
    return this.http
      .req(this.model + '/validedUsername', {
        username
      })
      .pipe(
        map(res => {
          if (res.error === 1) {
            return false;
          }
          return !res.data.exists;
        })
      );
  }
}
