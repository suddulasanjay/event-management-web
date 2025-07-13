/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RegistrationFormService } from './registration-form.service';

describe('Service: RegistrationForm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistrationFormService]
    });
  });

  it('should ...', inject([RegistrationFormService], (service: RegistrationFormService) => {
    expect(service).toBeTruthy();
  }));
});
