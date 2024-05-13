import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../Services/user.service';
import { beginLogin, beginRegister } from './User.action';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { showalert } from '../Common/App.action';
import { Userinfo } from '../Model/User.model';

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

  _userlogin = createEffect(() =>
    this.action$.pipe(
      ofType(beginLogin),
      exhaustMap((action) => {
        return this.userService.userLogin(action.usercred).pipe(
          map((data) => {
            if (data.length > 0) {
              const _userdata = data[0];
              if (_userdata.status === true) {
                this.router.navigate(['home']);
                return showalert({
                  message: 'Login Successful.',
                  resulttype: 'pass',
                });
              } else {
                return showalert({
                  message: 'Inactive User.',
                  resulttype: 'fail',
                });
              }
            } else {
              return showalert({
                message: 'Login Failed. Invalid Credentials',
                resulttype: 'fail',
              });
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
}
