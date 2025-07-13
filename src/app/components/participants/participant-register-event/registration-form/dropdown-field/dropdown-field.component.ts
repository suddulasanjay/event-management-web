import { Component, Input, OnInit, Optional } from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  NgControl,
} from '@angular/forms';
import { FieldOptionDTO } from 'src/app/models/DTO/field-option-dto.model';
import { BaseFormControl } from 'src/app/utils/base-form-control';

@Component({
  selector: 'app-dropdown-field',
  templateUrl: './dropdown-field.component.html',
  styleUrls: ['./dropdown-field.component.css'],
})
export class DropdownFieldComponent extends BaseFormControl {
  @Input() options: string[] = [];
  dropdownControl = new FormControl();
  constructor(
    ngControl: NgControl,
    @Optional() controlContainer: ControlContainer
  ) {
    super(ngControl, controlContainer);
    this.dropdownControl.valueChanges.subscribe((value) => {
      this.valueChange(value);
    });
  }
}
