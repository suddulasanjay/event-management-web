import { Injectable, OnInit, inject } from '@angular/core';
import { UserDetails } from '../models/BSO/user-details.model';
import { AuthenticationService } from './authentication.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { config } from 'src/environments/api';
import { UserDTO } from '../models/DTO/user-dto.model';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  private _http = inject(HttpClient);
  public user: UserDetails = {
    name: '',
    roleId: 0,
    userId: 0,
  };
  userSubject = new BehaviorSubject<UserDetails>(this.user);
  getAllUsers() {
    return this._http.get<UserDTO[]>(config.baseUrlUsers);
  }
  getUserByUserId(userId: number) {
    return this._http.get<UserDTO>(config.baseUrlUsers + userId);
  }
  updateUser(user: UserDTO) {
    return this._http.put(config.baseUrlUsers + user.userId, user);
  }
}
