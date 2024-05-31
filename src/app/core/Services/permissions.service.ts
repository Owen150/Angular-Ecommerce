import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root',
})

export class PermissionsService {

  constructor(private httpClient: HttpClient) {}

  // public delay() {
  //   return new Promise((resolve) => setTimeout(resolve, 500));
  // }

  public loadPermissions() {
    return this.httpClient
      .get(`${environment.userURL}`)
      .toPromise()
      .then(() => {
        return ['ADMIN', 'USER', 'MANAGER', 'SUPPLIER'];
      }
    );
  }
}
