import { Injectable } from '@angular/core';
import { BitService } from 'ngx-bit';

@Injectable()
export class PgService {
  constructor(
    private bit: BitService
  ) {
  }

  jsonb(field: string, locale?: string): string {
    return `${field}::jsonb->>'${locale ? locale : this.bit.locale}'`;
  }
}
