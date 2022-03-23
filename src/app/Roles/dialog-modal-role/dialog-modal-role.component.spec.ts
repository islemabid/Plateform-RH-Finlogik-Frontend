import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModalRoleComponent } from './dialog-modal-role.component';

describe('DialogModalRoleComponent', () => {
  let component: DialogModalRoleComponent;
  let fixture: ComponentFixture<DialogModalRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogModalRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogModalRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
