import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBeforeComponent } from './student-before.component';

describe('StudentBeforeComponent', () => {
  let component: StudentBeforeComponent;
  let fixture: ComponentFixture<StudentBeforeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentBeforeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentBeforeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
