import { Component, Inject, Input, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserDTO } from 'src/app/models/DTO/user-dto.model';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent {
  private _route = inject(Router);
  takeAction(user: UserDTO) {
    this._route.navigate([`/admin/edit-user/${user.userId}`]);
  }
  @Input() users: UserDTO[] = [];
  getRoleByRoleId(roleId: number) {
    if (roleId == 1) {
      return 'Admin';
    }
    if (roleId == 2) {
      return 'Organizer';
    }
    if (roleId == 3) {
      return 'Participant';
    }
    return '';
  }
}
