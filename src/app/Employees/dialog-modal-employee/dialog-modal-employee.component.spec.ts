import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModalEmployeeComponent } from './dialog-modal-employee.component';

describe('DialogModalEmployeeComponent', () => {
  let component: DialogModalEmployeeComponent;
  let fixture: ComponentFixture<DialogModalEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogModalEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogModalEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
