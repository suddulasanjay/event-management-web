import {
  Component,
  ComponentRef,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { FormFieldComponent } from './form-field/form-field.component';
import { FormControl, FormGroup } from '@angular/forms';
import { EventsService } from 'src/app/services/events.service';
import { EventBSO } from 'src/app/models/BSO/event-bso.model';
import { FieldBSO } from 'src/app/models/BSO/field-bso.model';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { RegistrationFormService } from 'src/app/services/registration-form.service';
import { FieldAndOptionsBSO } from 'src/app/models/BSO/field-and-options-bso.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organiser-add-event',
  templateUrl: './organiser-add-event.component.html',
  styleUrls: ['./organiser-add-event.component.css'],
})
export class OrganiserAddEventComponent {
  addEventForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    location: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    isPublished: new FormControl(true),
    price: new FormControl(0),
  });
  fields: any[] = [];
  private _eventService = inject(EventsService);
  private _user = inject(UserDetailsService).user;
  private _fieldsService = inject(RegistrationFormService);
  private _route = inject(Router);
  @ViewChild('fields', { read: ViewContainerRef })
  fieldsContainer!: ViewContainerRef;
  addFormField() {
    var compRef = this.fieldsContainer.createComponent(FormFieldComponent);
    this.fields.push(compRef);
  }
  OnSubmit() {
    let event: EventBSO = {
      organizerId: this._user.userId,
      title: this.addEventForm.value.title,
      description: this.addEventForm.value.description,
      location: this.addEventForm.value.location,
      startDate: this.addEventForm.value.startDate,
      endDate: this.addEventForm.value.endDate,
      isPublished: this.addEventForm.value.isPublished,
      price: this.addEventForm.value.price,
      createdBy: this._user.name,
    };
    this._eventService.createEvent(event).subscribe((event) => {
      let fieldDetails: FieldAndOptionsBSO[] = [];
      this.fields.forEach((ref: ComponentRef<FormFieldComponent>) => {
        if (ref != null) {
          let field: FieldAndOptionsBSO = {
            eventId: event.eventId,
            isRequired: ref.instance.fieldForm.value.isRequired,
            fieldName: ref.instance.fieldForm.value.fieldName,
            fieldType: ref.instance.fieldForm.value.fieldType,
            fieldOptions: this.getOptions(
              ref.instance.fieldForm.value.fieldOptions
            ),
          };
          if (ref.instance.isAlive) fieldDetails.push(field);
        }
      });
      this._fieldsService.createFields(fieldDetails);
      this._route.navigate(['/organizer/home']);
    });
  }
  getOptions(options: string) {
    return options.split(',');
  }
}
