import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectEmployeePostComponent } from './affect-employee-post.component';

describe('AffectEmployeePostComponent', () => {
  let component: AffectEmployeePostComponent;
  let fixture: ComponentFixture<AffectEmployeePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectEmployeePostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectEmployeePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
