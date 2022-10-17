import { TestBed } from '@angular/core/testing';

import { UserStreamService } from './user-stream.service';

describe('UserStreamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserStreamService = TestBed.get(UserStreamService);
    expect(service).toBeTruthy();
  });
});
