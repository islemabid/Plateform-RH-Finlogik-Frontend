import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeOffBalancesComponent } from './time-off-balances.component';

describe('TimeOffBalancesComponent', () => {
  let component: TimeOffBalancesComponent;
  let fixture: ComponentFixture<TimeOffBalancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeOffBalancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeOffBalancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
