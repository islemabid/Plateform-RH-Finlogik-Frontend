import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingHoursOffemployeeComponent } from './working-hours-offemployee.component';

describe('WorkingHoursOffemployeeComponent', () => {
  let component: WorkingHoursOffemployeeComponent;
  let fixture: ComponentFixture<WorkingHoursOffemployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkingHoursOffemployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingHoursOffemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
