import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Roles, Userinfo } from 'src/app/store/Models/User.model';
import { PermissionsService } from 'src/app/core/Services/permissions.service';
import { getRolesList, getUserByCode } from 'src/app/store/User/User.Selector';
import {
  getRoles,
  getuserbycode,
  updateuserrole,
} from 'src/app/store/User/User.Action';

@Component({
  selector: 'app-rolepopup',
  templateUrl: './rolepopup.component.html',
  styleUrls: ['./rolepopup.component.css'],
})
export class RolepopupComponent implements OnInit {
  roleList!: Roles[];
  userInfo!: Userinfo;

  constructor(
    private builder: FormBuilder,
    private store: Store,
    private permissionsService: PermissionsService,
    private ref: MatDialogRef<RolepopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.permissionsService.loadPermissions();
    this.store.dispatch(getRoles());
    this.store.select(getRolesList).subscribe((item) => {
      this.roleList = item;
    });
    if (this.data != null) {
      this.store.dispatch(getuserbycode({ username: this.data.code }));
      this.store.select(getUserByCode).subscribe((item) => {
        this.userInfo = item;
        this.roleForm.setValue({
          username: this.userInfo.username,
          role: this.userInfo.role,
          id: this.userInfo.id,
        });
      });
    }
  }

  roleForm = this.builder.group({
    id: this.builder.control(0),
    username: this.builder.control({ value: '', disabled: true }),
    role: this.builder.control('', Validators.required),
  });

  saveUserRole() {
    if (this.roleForm.valid) {
      this.store.dispatch(
        updateuserrole({
          userRole: this.roleForm.value.role as string,
          userId: this.roleForm.value.id as number,
        })
      );
      this.closePopup();
    }
  }

  closePopup() {
    this.ref.close();
  }
}
