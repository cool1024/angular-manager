import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputImagesComponent } from './input-images.component';

describe('InputImagesComponent', () => {
  let component: InputImagesComponent;
  let fixture: ComponentFixture<InputImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
