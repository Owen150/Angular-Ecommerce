import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { Userinfo } from '../Model/User.model';

// Auth Guards is a technique used to protect ones routes based on the user authentication status.
// It will manage different access levels to routes between authenticated and non-authenticated users, and returns a boolean value based on access permissions
// If the user is authenticated, the Auth Guard allows the navigation to proceed further. Otherwise, it will redirect the user to a login page or another appropriate route, preventing access to the protected content.
export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  let menuname = '';

  if(route.url.length>0){
    menuname = route.url[0].path;
  }

  const userinfo: Userinfo = userService.getUserDataFromStrorage();
  if (userinfo.username != '' && userinfo.username != null) {
    if (menuname != '') {
      userService.hasMenuAccess(userinfo.role, menuname).subscribe((item) => {
        const _menudata = item;
        if (_menudata.length > 0) {
          return true;
        } else {
          alert('Unauthorized Access.');
          router.navigate(['/home']);
          return false;
        }
      });
    } else {
      return true;
    }
    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};
