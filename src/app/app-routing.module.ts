import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegisterComponent } from './components/users/user-register/user-register.component';
import { UserLoginComponent } from './components/users/user-login/user-login.component';
import { AdminHomeComponent } from './components/admins/admin-home/admin-home.component';
import { OrganiserHomeComponent as OrganizerHomeComponent } from './components/organisers/organiser-home/organiser-home.component';
import { OrganiserAddEventComponent } from './components/organisers/organiser-add-event/organiser-add-event.component';
import { ParticipantHomeComponent } from './components/participants/participant-home/participant-home.component';
import { ParticipantRegisterEventComponent } from './components/participants/participant-register-event/participant-register-event.component';
import { AdminOnlyGuard } from './guards/admin-only.guard';
import { FacilitatorOnlyGuard } from './guards/facilitator-only.guard';
import { UserOnlyGuard } from './guards/user-only.guard';
import { UserLogoutComponent } from './components/users/user-logout/user-logout.component';
import { ManageUserComponent } from './components/admins/manage-user/manage-user.component';
import { OrganiserEventDetailsComponent } from './components/organisers/organiser-event-details/organiser-event-details.component';

const routes: Routes = [
  { path: 'user/register', component: UserRegisterComponent },
  { path: 'user/login', component: UserLoginComponent },
  {
    path: 'user/logout',
    component: UserLogoutComponent,
    canActivate: [UserOnlyGuard],
  },
  {
    path: 'admin/home',
    component: AdminHomeComponent,
    canActivate: [AdminOnlyGuard],
  },
  {
    path: 'admin/edit-user/:userId',
    component: ManageUserComponent,
    canActivate: [AdminOnlyGuard],
  },
  {
    path: 'organizer/home',
    component: OrganizerHomeComponent,
    canActivate: [FacilitatorOnlyGuard],
  },
  {
    path: 'organizer/add-event',
    component: OrganiserAddEventComponent,
    canActivate: [FacilitatorOnlyGuard],
  },
  {
    path: 'organizer/event-details/:eventId',
    component: OrganiserEventDetailsComponent,
    canActivate: [FacilitatorOnlyGuard],
  },
  { path: 'participant/home', component: ParticipantHomeComponent },
  {
    path: 'participant/register-event/:eventId',
    component: ParticipantRegisterEventComponent,
    canActivate: [UserOnlyGuard],
  },

  {
    path: '**',
    component: ParticipantHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
