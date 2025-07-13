import { Directive, EventEmitter, Input, Output } from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormGroupDirective,
  NgControl,
} from '@angular/forms';

@Directive({
  host: {},
})
export class BaseFormControl implements ControlValueAccessor {
  protected _onChange = (_: any) => {};
  protected _onTouched = () => {};
  blurred = false;
  value: any;
  disabled = false;

  constructor(private _ngControl: NgControl, private form: ControlContainer) {
    if (this._ngControl) {
      this._ngControl.valueAccessor = this;
    }
  }

  writeValue(value: any): void {
    if (this.value !== value) {
      this.value = value;
      this._onChange(value);
    }
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onBlur(event: Event) {
    this.blurred = true;
  }

  onFocus(event: Event) {
    this.touch();
  }

  touch() {
    this._onTouched();
  }

  valueChange(value: any) {
    this.value = value;
    this._onChange(value);
  }

  attachToForm(controlContainer: ControlContainer) {
    this.form = controlContainer;
  }
}
