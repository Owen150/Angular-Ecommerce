import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../core/Services/user.service';
import {
  beginLogin,
  beginRegister,
  duplicateUser,
  duplicateUserSuccess,
  fetchMenu,
  fetchMenuSuccess,
  getRoleSuccess,
  getRoles,
  getUserByCodeSuccess,
  getUserSuccess,
  getUsers,
  getuserbycode,
  updateuserrole,
} from './User.Action';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { showalert } from '../App Actions/App.Action';
import { Userinfo } from '../Models/User.model';

@Injectable()
export class UserEffect {
  constructor(
    private action$: Actions,
    private userService: UserService,
    private router: Router
  ) {}

  _userregister = createEffect(() =>
    this.action$.pipe(
      ofType(beginRegister),
      exhaustMap((action) => {
        return this.userService.userRegistration(action.userdata).pipe(
          map(() => {
            this.router.navigate(['/auth/login']);
            return showalert({
              message: 'User Registered Successfully.',
              resulttype: 'pass',
            });
          }),
          catchError((_error) =>
            of(
              showalert({
                message: 'User Registerion Failed due to :.' + _error.message,
                resulttype: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _duplicateuser = createEffect(() =>
    this.action$.pipe(
      ofType(duplicateUser),
      switchMap((action) => {
        return this.userService.duplicateUserName(action.username).pipe(
          switchMap((data) => {
            if (data.length > 0) {
              return of(
                duplicateUserSuccess({ isDuplicate: true }),
                showalert({
                  message: 'Username Already Exists.',
                  resulttype: 'fail',
                })
              );
            } else {
              return of(duplicateUserSuccess({ isDuplicate: false }));
            }
          }),
          catchError((_error) =>
            of(
              showalert({
                message: 'Registration Failed due to :.' + _error.message,
                resulttype: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _userlogin = createEffect(() =>
    this.action$.pipe(
      ofType(beginLogin),
      switchMap((action) => {
        return this.userService.userLogin(action.usercred).pipe(
          switchMap((data: Userinfo[]) => {
            if (data.length > 0) {
              const _userdata = data[0];
              if (_userdata.status === true) {
                this.userService.saveUserToLocalStorage(_userdata);
                this.router.navigate(['home']);
                return of(
                  fetchMenu({ userrole: _userdata.role }),
                  showalert({
                    message: 'Login Successful.',
                    resulttype: 'pass',
                  })
                );
              } else {
                return of(
                  showalert({
                    message: 'Inactive User.',
                    resulttype: 'fail',
                  })
                );
              }
            } else {
              return of(
                showalert({
                  message: 'Login Failed. Invalid Credentials',
                  resulttype: 'fail',
                })
              );
            }
          }),
          catchError((_error) =>
            of(
              showalert({
                message: 'Login Failed due to :.' + _error.message,
                resulttype: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _loadmenubyrole = createEffect(() =>
    this.action$.pipe(
      ofType(fetchMenu),
      exhaustMap((action) => {
        return this.userService.getMenuByRole(action.userrole).pipe(
          map((data) => {
            return fetchMenuSuccess({ menuList: data });
          }),
          catchError((_error) =>
            of(
              showalert({
                message: 'Failed to fetch the Menu List.',
                resulttype: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _getallusers = createEffect(() =>
    this.action$.pipe(
      ofType(getUsers),
      exhaustMap((action) => {
        return this.userService.getAllUsers().pipe(
          map((data) => {
            return getUserSuccess({ userlist: data });
          }),
          catchError((_error) =>
            of(
              showalert({
                message: 'Failed to fetch the Users List.',
                resulttype: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _getallroles = createEffect(() =>
    this.action$.pipe(
      ofType(getRoles),
      exhaustMap((action) => {
        return this.userService.getAllRoles().pipe(
          map((data) => {
            return getRoleSuccess({ roleList: data });
          }),
          catchError((_error) =>
            of(
              showalert({
                message: 'Failed to fetch the Roles List.',
                resulttype: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _getuserbycode = createEffect(() =>
    this.action$.pipe(
      ofType(getuserbycode),
      switchMap((action) => {
        return this.userService.duplicateUserName(action.username).pipe(
          switchMap((data) => {
            if (data.length > 0) {
              return of(getUserByCodeSuccess({ userInfo: data[0] }));
            } else {
              return of(duplicateUserSuccess({ isDuplicate: false }));
            }
          }),
          catchError((_error) =>
            of(
              showalert({
                message: 'Get User by Code Failed due to: ' + _error.message,
                resulttype: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _assignrole = createEffect(() =>
    this.action$.pipe(
      ofType(updateuserrole),
      switchMap((action) => {
        return this.userService
          .updateUserRole(action.userId, action.userRole)
          .pipe(
            switchMap(() => {
              return of(
                getUsers(),
                showalert({
                  message: 'User Role Updated Successfully',
                  resulttype: 'pass',
                })
              );
            }),
            catchError((_error) =>
              of(
                showalert({
                  message: 'User Role Update Failed due to: ' + _error.message,
                  resulttype: 'fail',
                })
              )
            )
          );
      })
    )
  );
}
