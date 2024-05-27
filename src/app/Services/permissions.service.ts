import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  private userURL = 'http://localhost:4000/user';

  constructor(private httpClient: HttpClient) {}

  // public delay() {
  //   return new Promise((resolve) => setTimeout(resolve, 500));
  // }

  public loadPermissions() {
    return this.httpClient
      .get(this.userURL)
      .toPromise()
      .then(() => {
        return ['ADMIN', 'USER', 'MANAGER', 'SUPPLIER'];
      }
    );
  }
}
