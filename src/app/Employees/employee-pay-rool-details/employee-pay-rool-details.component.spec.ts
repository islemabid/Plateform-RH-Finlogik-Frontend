import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePayRoolDetailsComponent } from './employee-pay-rool-details.component';

describe('EmployeePayRoolDetailsComponent', () => {
  let component: EmployeePayRoolDetailsComponent;
  let fixture: ComponentFixture<EmployeePayRoolDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeePayRoolDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePayRoolDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
