import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TajnistvoMonthComponent } from './tajnistvo-month.component';

describe('TajnistvoMonthComponent', () => {
  let component: TajnistvoMonthComponent;
  let fixture: ComponentFixture<TajnistvoMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TajnistvoMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TajnistvoMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
