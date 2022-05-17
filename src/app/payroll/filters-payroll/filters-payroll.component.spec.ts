import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersPayrollComponent } from './filters-payroll.component';

describe('FiltersPayrollComponent', () => {
  let component: FiltersPayrollComponent;
  let fixture: ComponentFixture<FiltersPayrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltersPayrollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersPayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
