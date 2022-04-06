import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateCandidatComponent } from './template-candidat.component';

describe('TemplateCandidatComponent', () => {
  let component: TemplateCandidatComponent;
  let fixture: ComponentFixture<TemplateCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateCandidatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
