import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[vPageFormItem]'
})
export class PageFormItemDirective {
  @Input() vPageFormItem!: string;

  constructor(public ref: TemplateRef<any>) {}
}
