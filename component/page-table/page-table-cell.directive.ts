import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[vPageTableCell]'
})
export class PageTableCellDirective {
  @Input() vPageTableCell!: string;

  constructor(public templateRef: TemplateRef<any>) {}
}
