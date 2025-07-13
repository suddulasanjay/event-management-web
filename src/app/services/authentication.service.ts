import { Injectable, inject } from '@angular/core';
import { UserDetailsService } from './user-details.service';
import { HttpClient } from '@angular/common/http';
import { config } from 'src/environments/api';
import { UserDetails } from '../models/BSO/user-details.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _http: HttpClient;
  constructor(http: HttpClient) {
    this._http = http;
  }
  public validateUser(email: string, passwordHash: string) {
    let url = config.baseUrlUsers + email + '/' + passwordHash;
    return this._http.get<UserDetails>(url);
  }
}
