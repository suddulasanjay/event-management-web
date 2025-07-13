import {
  AfterViewInit,
  Component,
  ComponentRef,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css'],
})
export class FormFieldComponent implements OnInit, AfterViewInit {
  isAlive = true;
  ngOnInit(): void {
    console.log('OnInit');
  }
  ngAfterViewInit(): void {
    console.log('AfterViewInit');
  }
  fieldForm: FormGroup = new FormGroup({
    fieldName: new FormControl(''),
    fieldType: new FormControl('text'),
    isRequired: new FormControl(true),
    fieldOptions: new FormControl(''),
  });
  inputTypes: string[] = [
    'text',
    'password',
    'email',
    'number',
    'checkbox',
    'tel',
    'url',
    'search',
    'color',
    'date',
    'datetime-local',
    'month',
    'range',
    'time',
    'week',
    'radio',
    'dropdown',
  ].sort();
  isMultiChoiceField(type: string) {
    return type === 'radio' || type === 'dropdown';
  }
  showInstruction = false;
  ToggleInstruction() {
    this.showInstruction = !this.showInstruction;
  }
  removeField() {
    this.isAlive = false;
  }
  OnSubmit() {}
}
