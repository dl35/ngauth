import { TestBed } from '@angular/core/testing';

import { Books2Service } from './books2.service';

describe('Books2Service', () => {
  let service: Books2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Books2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
