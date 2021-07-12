import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[vPageTableSearch]'
})
export class PageTableSearchDirective {
  @Input() vPageTableSearch!: string;

  constructor(public templateRef: TemplateRef<any>) {}
}
