import { TestBed } from '@angular/core/testing';

import { Sports1Service } from './sports1.service';

describe('Sports1Service', () => {
  let service: Sports1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Sports1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
