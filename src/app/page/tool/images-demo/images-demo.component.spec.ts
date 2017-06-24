import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesDemoComponent } from './images-demo.component';

describe('ImagesDemoComponent', () => {
  let component: ImagesDemoComponent;
  let fixture: ComponentFixture<ImagesDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagesDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
