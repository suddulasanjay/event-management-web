import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserBSO } from 'src/app/models/BSO/user-bso.model';
import { UserDTO } from 'src/app/models/DTO/user-dto.model';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { simpleHash } from 'src/utils/passwordHash';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css'],
})
export class ManageUserComponent implements OnInit {
  private _activatedRoute = inject(ActivatedRoute);
  private _route = inject(Router);
  private _userService = inject(UserDetailsService);
  constructor(private fb: FormBuilder) {}
  userForm!: FormGroup;
  userId: number = 0;

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passwordHash: ['', Validators.required],
      roleId: ['', Validators.required],
    });
    this._activatedRoute.paramMap.subscribe((params) => {
      var para = params.get('userId');
      if (para) {
        var userId = +para;
        this._userService.getUserByUserId(userId).subscribe((user) => {
          this.userId = user.userId;
          this.userForm.patchValue({
            name: user.name,
            email: user.email,
            passwordHash: user.passwordHash,
            roleId: user.roleId,
          });
        });
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.userForm.value.passwordHash = simpleHash(
        this.userForm.value.passwordHash
      );
      let user: UserDTO = {
        userId: this.userId,
        name: this.userForm.value.name,
        email: this.userForm.value.email,
        passwordHash: this.userForm.value.passwordHash,
        roleId: this.userForm.value.roleId,
        createdBy: this.userForm.value.name,
        lastModifiedBy: this._userService.user.name,
      };
      this._userService.updateUser(user).subscribe();
    }
    this._route.navigate(['/admin/users']);
  }
}
