import { TestBed } from '@angular/core/testing';

import { Books1Service } from './books1.service';

describe('Books1Service', () => {
  let service: Books1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Books1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
