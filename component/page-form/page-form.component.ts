import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Bit } from 'ngx-bit';
import { PageFormItemDirective } from './page-form-item.directive';
import { PageFormSchema } from '@vanx/framework';

@Component({
  selector: 'v-page-form',
  templateUrl: './page-form.component.html'
})
export class PageFormComponent implements AfterViewInit {
  templates: TemplateRef<any>[] = [];

  @Input() formGroup!: FormGroup;
  @Input() submit!: (data: any) => void;
  @Input() cancelDisabled = false;
  @Input() innerItems!: QueryList<PageFormItemDirective>;
  @Input() options!: Map<string, any>;
  @ContentChildren(PageFormItemDirective) items!: QueryList<PageFormItemDirective>;

  private dataset!: any[];

  constructor(public bit: Bit, public changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.dataset = [...this.items.toArray(), ...(!this.innerItems ? [] : this.innerItems.toArray())];
    this.templates = this.dataset.map(v => v.ref);
    this.changeDetectorRef.detectChanges();
  }

  plan(schema: { [key: string]: PageFormSchema }): void {
    this.dataset = this.dataset
      .filter((v: PageFormItemDirective) => {
        if (!schema.hasOwnProperty(v.vPageFormItem)) {
          return true;
        }
        return !schema[v.vPageFormItem].disabled;
      })
      .sort((a: PageFormItemDirective, b: PageFormItemDirective) => {
        const n1 = !schema.hasOwnProperty(a.vPageFormItem) ? 0 : schema[a.vPageFormItem].weight!;
        const n2 = !schema.hasOwnProperty(b.vPageFormItem) ? 0 : schema[b.vPageFormItem].weight!;
        return n1 > n2 ? -1 : 1;
      });
    this.templates = this.dataset.map(v => v.ref);
    this.changeDetectorRef.detectChanges();
  }
}
