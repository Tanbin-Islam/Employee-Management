import { TestBed } from '@angular/core/testing';

import { EmplyeeService } from './emplyee.service';

describe('EmplyeeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmplyeeService = TestBed.get(EmplyeeService);
    expect(service).toBeTruthy();
  });
});
