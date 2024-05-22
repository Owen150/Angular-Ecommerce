import { Injectable } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(private permissionsService: NgxPermissionsService) { }

  loadPermissions(){
    const perm = ['ADMIN'];
    this.permissionsService.loadPermissions(perm);
  }
}
