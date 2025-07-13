import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventDTO } from 'src/app/models/DTO/event-dto.model';
import { FieldAndOptionsDTO } from 'src/app/models/DTO/field-and-options-dto.model';
import { FieldDTO } from 'src/app/models/DTO/field-dto.model';
import { EventsService } from 'src/app/services/events.service';
import { RegistrationFormService } from 'src/app/services/registration-form.service';

@Component({
  selector: 'app-participant-register-event',
  templateUrl: './participant-register-event.component.html',
  styleUrls: ['./participant-register-event.component.css'],
})
export class ParticipantRegisterEventComponent implements OnInit {
  private _activatedRoute = inject(ActivatedRoute);
  private _formService = inject(RegistrationFormService);
  private _eventService = inject(EventsService);
  fields: FieldAndOptionsDTO[] = [];
  registrationForm = new FormGroup({});
  event!: EventDTO;
  // @Input() eventId = 0;
  ngOnInit() {
    this._activatedRoute.paramMap.subscribe((params) => {
      var para = params.get('eventId');
      if (para) {
        var eventId = +para;
        this._formService.getFields(eventId).subscribe((formFields) => {
          formFields.forEach((formField) => {
            let field: FieldAndOptionsDTO = {
              fieldId: formField.fieldId,
              fieldName: formField.fieldName,
              fieldType: formField.fieldType,
              fieldOptions: [],
              isRequired: formField.isRequired,
            };
            if (this._formService.isMultiChoiceField(formField.fieldType)) {
              let fieldOptions: string[] = [];
              this._formService
                .getFieldOptions(formField.fieldId)
                .subscribe((options) => {
                  options.forEach((option) => {
                    fieldOptions.push(option.fieldOption1);
                  });
                });
              field.fieldOptions = fieldOptions;
            }
            this.fields.push(field);
          });
        });

        this._eventService.getallEvents().subscribe((val) => {
          this.event = val.filter((e) => e.eventId === eventId)[0];
        });
      }
    });
  }
}
