import { TestBed } from '@angular/core/testing';

import { Sports2Service } from './sports2.service';

describe('Sports2Service', () => {
  let service: Sports2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Sports2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
