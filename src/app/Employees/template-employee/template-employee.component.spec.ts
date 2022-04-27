import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateEmployeeComponent } from './template-employee.component';

describe('TemplateEmployeeComponent', () => {
  let component: TemplateEmployeeComponent;
  let fixture: ComponentFixture<TemplateEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
