import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { config } from 'src/environments/api';
import { FieldDTO } from '../models/DTO/field-dto.model';
import { FieldBSO } from '../models/BSO/field-bso.model';
import { FieldAndOptionsBSO } from '../models/BSO/field-and-options-bso.model';
import { FieldOptionBSO } from '../models/BSO/field-option-bso.model';
import { UserDetailsService } from './user-details.service';
import { FieldOptionDTO } from '../models/DTO/field-option-dto.model';

@Injectable({
  providedIn: 'root',
})
export class RegistrationFormService {
  private _http = inject(HttpClient);
  private _user = inject(UserDetailsService).user;
  fields: FieldDTO[] = [];
  isMultiChoiceField(type: string) {
    return type === 'radio' || type === 'dropdown';
  }
  getFields(eventId: number) {
    return this._http.get<FieldDTO[]>(
      config.baseUrlFields + `event/${eventId}`
    );
  }
  getFieldOptions(fieldId: number) {
    let url = config.baseUrlFieldOptions + 'field/' + `${fieldId}`;
    return this._http.get<FieldOptionDTO[]>(url);
  }
  createFields(fieldDetails: FieldAndOptionsBSO[]) {
    let url = config.baseUrlFields;
    fieldDetails.forEach((field) => {
      let data: FieldBSO = {
        eventId: field.eventId,
        fieldName: field.fieldName,
        isRequired: field.isRequired,
        fieldType: field.fieldType,
        createdBy: this._user.name,
      };
      this._http.post<FieldDTO>(url, data).subscribe((fieldDto) => {
        if (field.fieldOptions.length > 0) {
          field.fieldOptions.forEach((fieldOption) => {
            let option: FieldOptionBSO = {
              fieldId: fieldDto.fieldId,
              fieldOption1: fieldOption,
              createdBy: this._user.name,
            };
            this._http
              .post<FieldOptionBSO>(config.baseUrlFieldOptions, option)
              .subscribe();
          });
        }
      });
    });
  }
}
