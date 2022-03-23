import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModalContratComponent } from './dialog-modal-contrat.component';

describe('DialogModalContratComponent', () => {
  let component: DialogModalContratComponent;
  let fixture: ComponentFixture<DialogModalContratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogModalContratComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogModalContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
