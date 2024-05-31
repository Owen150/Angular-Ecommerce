import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoleAccess, Roles, Usercred, Userinfo, Users } from '../../store/Models/User.model';
import { Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private httpClient: HttpClient) {}

  // Register new user
  userRegistration(userdata: Users) {
    return this.httpClient.post(`${environment.userURL}`, userdata);
  }

  // Custom Login URL
  userLogin(userdata: Usercred): Observable<Userinfo[]> {
    return this.httpClient.get<Userinfo[]>(
      environment.userURL +
        '?username=' +
        userdata.username +
        '&password=' +
        userdata.password
    );
  }

  // Check for duplicate user registration
  duplicateUserName(username: string): Observable<Userinfo[]> {
    return this.httpClient.get<Userinfo[]>(
      `${environment.userURL}` + '?username=' + username
    );
  }

  // Role based Menu Access
  // Function takes the userrole and returns a list of menus based on the role i.e RoleAccess[]
  getMenuByRole(userrole: string): Observable<RoleAccess[]> {
    return this.httpClient.get<RoleAccess[]>(
      `${environment.roleAccessURL}` + userrole
    );
  }

  // Block URL menu access by Role
  hasMenuAccess(userrole: string, menuname: string): Observable<RoleAccess[]> {
    return this.httpClient.get<RoleAccess[]>(
      `${environment.roleAccessURL}` + userrole + '&menu=' + menuname
    );
  }

  // Get All Users
  getAllUsers(): Observable<Users[]> {
    return this.httpClient.get<Users[]>(`${environment.userURL}`);
  }

  // Get All Roles
  getAllRoles(): Observable<Roles[]> {
    return this.httpClient.get<Roles[]>(`${environment.roleURL}`);
  }

  // Update User Role
  updateUserRole(userId: number, role: string){
    return this.httpClient.get<Users>(`${environment.userURL}`+'/'+userId).pipe(
      switchMap((data) => {
        data.role = role;
        return this.httpClient.put(`${environment.userURL}`+'/'+userId, data);
      })
    )
  }

  // Save user data to local storage
  saveUserToLocalStorage(userdata: Userinfo) {
    localStorage.setItem('userdata', JSON.stringify(userdata));
  }
  // Get user data from local storage upon successful login
  getUserDataFromStrorage() {
    let _obj: Userinfo = {
      id: 0,
      username: '',
      email: '',
      name: '',
      role: '',
      status: false,
    };
    if (localStorage.getItem('userdata') != null) {
      let jsonstring = localStorage.getItem('userdata') as string;
      _obj = JSON.parse(jsonstring);
      return _obj;
    } else {
      return _obj;
    }
  }
}
