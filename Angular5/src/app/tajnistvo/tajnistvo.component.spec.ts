import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TajnistvoComponent } from './tajnistvo.component';

describe('TajnistvoComponent', () => {
  let component: TajnistvoComponent;
  let fixture: ComponentFixture<TajnistvoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TajnistvoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TajnistvoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
