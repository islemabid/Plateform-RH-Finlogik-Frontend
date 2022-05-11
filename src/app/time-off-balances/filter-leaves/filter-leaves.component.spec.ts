import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterLeavesComponent } from './filter-leaves.component';

describe('FilterLeavesComponent', () => {
  let component: FilterLeavesComponent;
  let fixture: ComponentFixture<FilterLeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterLeavesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
