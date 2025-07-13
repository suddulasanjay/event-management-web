import { Component, OnInit, inject } from '@angular/core';
import { UserDetailsService } from './services/user-details.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private _route = inject(Router);
  displayNavbar = true;
  ngOnInit(): void {
    this._userService.userSubject.subscribe((val) => {
      this.user = val;
      this.role = val.roleId;
    });
    this._route.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((e) => {
        // console.log(e);

        this.displayNavbar = !(e as NavigationEnd).urlAfterRedirects
          .toLowerCase()
          .includes('user');
      });
  }
  title = 'EventsApp';
  private _userService = inject(UserDetailsService);
  user = this._userService.user;
  role = this.user.roleId;
  goProfile() {
    this._route.navigate(['/user/logout']);
  }
}
