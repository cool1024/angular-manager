import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDomComponent } from './form-dom.component';

describe('FormDomComponent', () => {
  let component: FormDomComponent;
  let fixture: ComponentFixture<FormDomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
