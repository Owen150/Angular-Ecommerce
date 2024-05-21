import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Users } from 'src/app/Model/User.model';
import { getUsersList } from 'src/app/User/User.Selector';
import { getUsers } from 'src/app/User/User.action';
import { RolepopupComponent } from '../rolepopup/rolepopup.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
})
export class UserlistComponent implements OnInit {
  userlist!: Users[];
  displayedColums: string[] = ['username', 'name', 'email', 'role', 'status', 'action'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort 


  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(getUsers());
    this.store.select(getUsersList).subscribe((item) => {
      this.userlist = item;
      this.dataSource = new MatTableDataSource<Users>(this.userlist);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    });
  }

  functionChangeRole(username: string) {
    this.OpenPopup(username)
  }

  OpenPopup(username: string) {
    this.dialog.open(RolepopupComponent, {
      width: '30%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        code: username
      }
    })
  }
}
