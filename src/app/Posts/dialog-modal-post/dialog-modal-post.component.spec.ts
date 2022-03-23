import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModalPostComponent } from './dialog-modal-post.component';

describe('DialogModalPostComponent', () => {
  let component: DialogModalPostComponent;
  let fixture: ComponentFixture<DialogModalPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogModalPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogModalPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
