import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabSkeletonComponent } from './lab-skeleton.component';

describe('LabSkeletonComponent', () => {
  let component: LabSkeletonComponent;
  let fixture: ComponentFixture<LabSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabSkeletonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
