import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEmployeePostsComponent } from './details-employee-posts.component';

describe('DetailsEmployeePostsComponent', () => {
  let component: DetailsEmployeePostsComponent;
  let fixture: ComponentFixture<DetailsEmployeePostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsEmployeePostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsEmployeePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
