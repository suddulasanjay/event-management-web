import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserBSO } from 'src/app/models/BSO/user-bso.model';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-user-logout',
  templateUrl: './user-logout.component.html',
  styleUrls: ['./user-logout.component.css'],
})
export class UserLogoutComponent implements OnInit {
  private _route = inject(Router);
  private _userDetails = inject(UserDetailsService);
  user!: UserBSO;
  ngOnInit(): void {
    this._userDetails
      .getUserByUserId(this._userDetails.user.userId)
      .subscribe((user) => {
        this.user = user;
      });
  }
  logout() {
    this._userDetails.userSubject.next({ userId: 0, name: '', roleId: 0 });
    this._route.navigate(['/participant/home']);
  }
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
  cancel() {
    this._route.navigate(['/participant/home']);
  }
}
