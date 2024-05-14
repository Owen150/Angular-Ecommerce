import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { Userinfo } from '../Model/User.model';

// Auth Guards is a technique used to protect ones routes based on the user authentication status.
// It will manage different access levels between authenticated and non-authenticated users.
// If the user is authenticated, the Auth Guard allows the navigation to proceed further. Otherwise, it will redirect the user to a login page or another appropriate route, preventing access to the protected content.
export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const userinfo: Userinfo = userService.getUserDataFromStrorage();
  if (userinfo.username != '' && userinfo.username != null) {
    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};
