import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FieldAndOptionsDTO } from 'src/app/models/DTO/field-and-options-dto.model';
import { FieldDTO } from 'src/app/models/DTO/field-dto.model';
import { RegisterUserService } from 'src/app/services/register-user.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent {
  private _regService = inject(RegisterUserService);
  private _route = inject(Router);
  fields: FieldAndOptionsDTO[] = [];
  @Input() set formFields(val: FieldAndOptionsDTO[]) {
    console.log(val);
    this.fields = val;
    this.createControls();
  }
  @Input() eventId: number = 0;
  registrationForm = new FormGroup({});
  getInputType(type: string) {
    if (type !== 'dropdown') return type;
    return 'select';
  }
  isMultiChoiceField(type: string) {
    return type === 'radio' || type === 'dropdown';
  }
  createControls() {
    this.fields.forEach((field) => {
      let control: FormControl = new FormControl();
      this.registrationForm.addControl(field.fieldName, control);
    });
  }
  OnSubmit() {
    console.log(this.registrationForm.value);
    this._regService.sendResponse(
      this.eventId,
      true,
      this.fields,
      this.registrationForm
    );
    this._route.navigate(['/participant/home']);
  }
}
