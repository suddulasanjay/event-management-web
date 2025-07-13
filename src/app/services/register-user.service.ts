import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { config } from 'src/environments/api';
import { RegistrationDTO } from '../models/DTO/registration-dto.model';
import { RegistrationBSO } from '../models/BSO/registration-bso.model';
import { UserDetailsService } from './user-details.service';
import { ResponseBSO } from '../models/BSO/response-bso.model';
import { FieldDTO } from '../models/DTO/field-dto.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class RegisterUserService {
  private _http = inject(HttpClient);
  private _user = inject(UserDetailsService).user;
  getFieldValue(formGroup: FormGroup, fieldName: string): any {
    var field = formGroup.get(fieldName);
    return field ? field.value.toString() : '';
  }

  createResponseObject(
    registrationId: number,
    name: string,
    field: FieldDTO,
    formGroup: FormGroup
  ) {
    let res: ResponseBSO = {
      registrationId,
      fieldId: field.fieldId,
      fieldValue: this.getFieldValue(formGroup, field.fieldName),
      createdBy: name,
    };
    return res;
  }
  sendResponse(
    eventId: number,
    paymentStatus: boolean,
    fields: FieldDTO[],
    formGroup: FormGroup
  ) {
    if (paymentStatus === true) {
      let regData: RegistrationBSO = {
        eventId,
        paymentStatus,
        userId: this._user.userId,
        createdBy: this._user.name,
      };
      console.log(regData);

      this._http
        .post<RegistrationDTO>(config.baseUrlRegistrations, regData)
        .subscribe((reg) => {
          fields.forEach((field) => {
            let resData = this.createResponseObject(
              reg.registrationId,
              reg.createdBy,
              field,
              formGroup
            );
            this._http
              .post<any>(config.baseUrlResponses, resData)
              .subscribe((val) => console.log);
          });
        });
    }
  }
}
