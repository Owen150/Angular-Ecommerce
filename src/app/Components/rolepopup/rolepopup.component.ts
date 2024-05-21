import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Roles, Userinfo } from 'src/app/Model/User.model';
import { getRolesList } from 'src/app/User/User.Selector';
import { getRoles } from 'src/app/User/User.action';

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
    private ref: MatDialogRef<RolepopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getRoles());
    this.store.select(getRolesList).subscribe((data) => {
      this.roleList = data;
    })
  }

  roleForm = this.builder.group({
    id: this.builder.control(0),
    username: this.builder.control({value: '', disabled:true}),
    role: this.builder.control('', Validators.required),
  });

  saveUserRole() {
    if (this.roleForm.valid){
      // this.store.dispatch();
      this.closePopup(); 
    }
  }

  closePopup() {
    this.ref.close();
  }
}
