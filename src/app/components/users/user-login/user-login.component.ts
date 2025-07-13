import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { simpleHash } from 'src/utils/passwordHash';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent {
  private _auth: AuthenticationService;
  private _user: UserDetailsService;
  public route: Router;
  constructor(
    authService: AuthenticationService,
    route: Router,
    userService: UserDetailsService
  ) {
    this._auth = authService;
    this.route = route;
    this._user = userService;
  }
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  OnSubmit() {
    let passwordHash = '';
    let password = this.loginForm.value.password;
    let email = this.loginForm.value.email;
    if (password != null) {
      passwordHash = simpleHash(password);
    }
    if (email != null) {
      this._auth.validateUser(email, passwordHash).subscribe((val) => {
        this._user.userSubject.next(val);
        this._user.user = val;
        this.route.navigate(['/participant/home']);
      });
    }
  }
}
