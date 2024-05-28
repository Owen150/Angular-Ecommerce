import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { PermissionsService } from '../Services/permissions.service';
import { NgxPermissionsService } from 'ngx-permissions';

export const permissionsGuard: CanActivateFn = (route, state) => {
  const permissionsService = inject(PermissionsService);
  const ngxPermissionsService = inject(NgxPermissionsService);

  return permissionsService.loadPermissions().then((data) => {
    ngxPermissionsService.loadPermissions(data);
    return true;
  });
};
