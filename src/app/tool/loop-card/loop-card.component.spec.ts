import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoopCardComponent } from './loop-card.component';

describe('LoopCardComponent', () => {
  let component: LoopCardComponent;
  let fixture: ComponentFixture<LoopCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoopCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoopCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
