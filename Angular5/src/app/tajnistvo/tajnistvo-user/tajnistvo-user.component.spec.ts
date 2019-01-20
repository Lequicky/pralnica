import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TajnistvoUserComponent } from './tajnistvo-user.component';

describe('TajnistvoUserComponent', () => {
  let component: TajnistvoUserComponent;
  let fixture: ComponentFixture<TajnistvoUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TajnistvoUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TajnistvoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
