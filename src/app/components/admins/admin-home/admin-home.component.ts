import { Component, OnInit, inject } from '@angular/core';
import { UserDTO } from 'src/app/models/DTO/user-dto.model';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  private _userService = inject(UserDetailsService);
  users: UserDTO[] = [];
  ngOnInit(): void {
    this._userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }
}
