import { Injectable } from '@angular/core';
import { BitCurdCommonService } from 'ngx-bit';
import { Observable } from 'rxjs';

@Injectable()
export class PolicyService {
  private model = 'policy';

  constructor(private curd: BitCurdCommonService) {}

  originLists(): Observable<any> {
    return this.curd.originLists(this.model);
  }

  add(data: any): Observable<any> {
    return this.curd.add(this.model, data);
  }

  delete(id: any[]): Observable<any> {
    return this.curd.delete(this.model, id);
  }

  status(data: any): Observable<any> {
    return this.curd.status(this.model, data, 'policy');
  }
}
