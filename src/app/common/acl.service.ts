import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BitHttpService } from 'ngx-bit';
import { ListByPage } from 'ngx-bit/factory';

@Injectable()
export class AclService {
  private model = 'acl';

  constructor(
    private http: BitHttpService
  ) {
  }

  originLists(): Observable<any> {
    return this.http.originLists(this.model);
  }

  lists(factory: ListByPage, refresh: boolean, persistence: boolean): Observable<any> {
    return this.http.lists(this.model, factory, {
      refresh,
      persistence
    });
  }

  add(data: any) {
    return this.http.add(this.model, data);
  }

  get(id: any) {
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

  /**
   * 验证访问控制键是否存在
   */
  validedKey(key: string, edit: Observable<string> = of(null)) {
    return edit.pipe(
      switchMap(editKey => (key === editKey ? of({
          error: 0,
          data: false
        }) : this.http.req(this.model + '/validedKey', {
          key
        })
      ))
    );
  }
}
