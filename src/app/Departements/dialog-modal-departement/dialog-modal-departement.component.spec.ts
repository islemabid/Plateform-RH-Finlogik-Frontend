import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModalDepartementComponent } from './dialog-modal-departement.component';

describe('DialogModalDepartementComponent', () => {
  let component: DialogModalDepartementComponent;
  let fixture: ComponentFixture<DialogModalDepartementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogModalDepartementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogModalDepartementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
