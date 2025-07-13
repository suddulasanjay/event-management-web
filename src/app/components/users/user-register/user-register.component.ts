import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { concatWith } from 'rxjs';
import { UserBSO } from 'src/app/models/BSO/user-bso.model';
import { UserDTO } from 'src/app/models/DTO/user-dto.model';
import { config } from 'src/environments/api';
import { Roles } from 'src/environments/roles';
import { simpleHash } from 'src/utils/passwordHash';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent {
  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl(''),
  });
  private _route = inject(Router);
  private _http = inject(HttpClient);
  private resolveRoleId(role: string): number {
    if (role === 'admin') return Roles.Admin;
    if (role === 'organizer') return Roles.Organizer;
    if (role === 'participant') return Roles.Participant;
    return 0;
  }
  OnSubmit() {
    var input = this.registerForm.value;
    if (input?.name && input?.email && input?.password && input?.role) {
      let user: UserDTO = {
        userId: 0,
        name: input.name,
        email: input.email,
        roleId: this.resolveRoleId(input.role),
        passwordHash: simpleHash(input.password),
        createdBy: input.name,
        lastModifiedBy: input.name,
      };
      this._http
        .post(config.baseUrlUsers, user)
        .subscribe((val) => console.log(val));
    }
    this._route.navigate(['/user/login']);
  }
}
