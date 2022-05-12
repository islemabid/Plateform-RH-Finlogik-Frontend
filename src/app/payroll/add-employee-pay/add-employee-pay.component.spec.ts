import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeePayComponent } from './add-employee-pay.component';

describe('AddEmployeePayComponent', () => {
  let component: AddEmployeePayComponent;
  let fixture: ComponentFixture<AddEmployeePayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeePayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeePayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
