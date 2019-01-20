import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TajnistvoPregledComponent } from './tajnistvo-pregled.component';

describe('TajnistvoPregledComponent', () => {
  let component: TajnistvoPregledComponent;
  let fixture: ComponentFixture<TajnistvoPregledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TajnistvoPregledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TajnistvoPregledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
