import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormFieldComponent } from './components/organisers/organiser-add-event/form-field/form-field.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegisterComponent } from './components/users/user-register/user-register.component';
import { UserLoginComponent } from './components/users/user-login/user-login.component';
import { ParticipantHomeComponent } from './components/participants/participant-home/participant-home.component';
import { ParticipantRegisterEventComponent } from './components/participants/participant-register-event/participant-register-event.component';
import { OrganiserHomeComponent } from './components/organisers/organiser-home/organiser-home.component';
import { OrganiserAddEventComponent } from './components/organisers/organiser-add-event/organiser-add-event.component';
import { AdminHomeComponent } from './components/admins/admin-home/admin-home.component';
import { UserDetailsService } from './services/user-details.service';
import { AuthenticationService } from './services/authentication.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EventsTableComponent } from './components/shared/events-table/events-table.component';
import { RegistrationFormComponent } from './components/participants/participant-register-event/registration-form/registration-form.component';
import { DropdownFieldComponent } from './components/participants/participant-register-event/registration-form/dropdown-field/dropdown-field.component';
import { RadioFieldComponent } from './components/participants/participant-register-event/registration-form/radio-field/radio-field.component';
import { UsersTableComponent } from './components/shared/users-table/users-table.component';
import { ManageUserComponent } from './components/admins/manage-user/manage-user.component';
import { OrganiserEventDetailsComponent } from './components/organisers/organiser-event-details/organiser-event-details.component';

@NgModule({
  declarations: [
    AppComponent,
    UserRegisterComponent,
    UserLoginComponent,
    ParticipantHomeComponent,
    ParticipantRegisterEventComponent,
    OrganiserHomeComponent,
    OrganiserAddEventComponent,
    AdminHomeComponent,
    FormFieldComponent,
    EventsTableComponent,
    RegistrationFormComponent,
    DropdownFieldComponent,
    RadioFieldComponent,
    UsersTableComponent,
    ManageUserComponent,
    OrganiserEventDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [UserDetailsService, AuthenticationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
