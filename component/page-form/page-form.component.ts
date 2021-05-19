import { AfterViewInit, ChangeDetectorRef, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BitService } from 'ngx-bit';
import { PageFormItemDirective } from './page-form-item.directive';

@Component({
  selector: 'v-page-form',
  template: `
    <nz-card>
      <form nz-form [formGroup]="formGroup" (bitFormSubmit)="submit($event)">
        <ng-container *ngFor="let data of dataset">
          <ng-container *ngTemplateOutlet="data.template"></ng-container>
        </ng-container>
        <nz-divider></nz-divider>
        <nz-form-item>
          <nz-form-control bitCol="submit">
            <nz-space>
              <button *nzSpaceItem nz-button nzType="primary" [disabled]="!formGroup.valid">
                <i nz-icon nzType="check"></i> {{ bit.l["submit"] }}
              </button>

              <ng-container *ngIf="!cancelDisabled">
                <button *nzSpaceItem nz-button type="button" bitBack>
                  <i nz-icon nzType="close"></i> {{ bit.l["cancel"] }}
                </button>
              </ng-container>
            </nz-space>
          </nz-form-control>
        </nz-form-item>
      </form>
    </nz-card>
  `
})
export class PageFormComponent implements AfterViewInit {
  @Input() formGroup: FormGroup;
  @Input() submit: (data: any) => void;
  @Input() cancelDisabled = false;
  @Input() innerItems: QueryList<PageFormItemDirective>;
  @ContentChildren(PageFormItemDirective) items: QueryList<PageFormItemDirective>;
  dataset: PageFormItemDirective[] = [];

  constructor(
    public bit: BitService,
    public changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngAfterViewInit(): void {
    this.dataset = [
      ...this.items.toArray(),
      ...(!this.innerItems ? [] : this.innerItems.toArray())
    ];
    this.changeDetectorRef.detectChanges();
  }
}
