import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTimeOffComponent } from './request-time-off.component';

describe('RequestTimeOffComponent', () => {
  let component: RequestTimeOffComponent;
  let fixture: ComponentFixture<RequestTimeOffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestTimeOffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestTimeOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
