import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Users } from 'src/app/store/Models/User.model';
import { getUsersList } from 'src/app/store/User/User.Selector';
import { getUsers } from 'src/app/store/User/User.Action';
import { RolepopupComponent } from '../role-popup-modal/rolepopup.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PermissionsService } from 'src/app/core/Services/permissions.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
})
export class UserlistComponent implements OnInit {
  userlist!: Users[];
  displayedColums: string[] = [
    'username',
    'name',
    'email',
    'role',
    'status',
    'action',
  ];
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private store: Store,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    // this.permissionsService.loadPermissions();
    this.store.dispatch(getUsers());
    this.store.select(getUsersList).subscribe((item) => {
      this.userlist = item;
      this.dataSource = new MatTableDataSource<Users>(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  functionChangeRole(username: string) {
    this.OpenPopup(username);
  }

  OpenPopup(username: string) {
    this.dialog.open(RolepopupComponent, {
      width: '30%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        code: username,
      },
    });
  }
}
