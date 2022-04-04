import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModalOfferComponent } from './dialog-modal-offer.component';

describe('DialogModalOfferComponent', () => {
  let component: DialogModalOfferComponent;
  let fixture: ComponentFixture<DialogModalOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogModalOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogModalOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
