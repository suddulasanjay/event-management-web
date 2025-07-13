import { Injectable, inject } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserDetailsService } from '../services/user-details.service';
import { Roles } from 'src/environments/roles';

@Injectable({
  providedIn: 'root',
})
export class AdminOnlyGuard implements CanActivate {
  private router = inject(Router);
  private userService = inject(UserDetailsService);

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.userService.user;
    if (user && user.roleId === Roles.Admin) {
      return true;
    } else {
      this.router.navigate(['/participant/home']);
      return false;
    }
  }
}
