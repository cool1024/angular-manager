import { TestBed, inject } from '@angular/core/testing';

import { InputImagesService } from './input-images.service';

describe('InputImagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InputImagesService]
    });
  });

  it('should ...', inject([InputImagesService], (service: InputImagesService) => {
    expect(service).toBeTruthy();
  }));
});
