import { Component, Input, OnInit, Optional } from '@angular/core';
import { NgControl, ControlContainer, FormControl } from '@angular/forms';
import { FieldOptionDTO } from 'src/app/models/DTO/field-option-dto.model';
import { BaseFormControl } from 'src/app/utils/base-form-control';

@Component({
  selector: 'app-radio-field',
  templateUrl: './radio-field.component.html',
  styleUrls: ['./radio-field.component.css'],
})
export class RadioFieldComponent extends BaseFormControl {
  @Input() options: string[] = [];
  radioControl = new FormControl();
  constructor(
    ngControl: NgControl,
    @Optional() controlContainer: ControlContainer
  ) {
    super(ngControl, controlContainer);
    this.radioControl.valueChanges.subscribe((value) => {
      this.valueChange(value);
    });
  }
}
