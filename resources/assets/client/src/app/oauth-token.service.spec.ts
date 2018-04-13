import { TestBed, inject } from '@angular/core/testing';

import { OauthTokenService } from './oauth-token.service';

describe('OauthTokenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OauthTokenService]
    });
  });

  it('should be created', inject([OauthTokenService], (service: OauthTokenService) => {
    expect(service).toBeTruthy();
  }));
});
