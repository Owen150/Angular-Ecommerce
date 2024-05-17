import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoleAccess, Usercred, Userinfo, Users } from '../Model/User.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = 'http://localhost:4000/user';

  constructor(private httpClient: HttpClient) { }

  // Register new user
  userRegistration(userdata: Users){
    return this.httpClient.post(this.baseURL, userdata);
  }

  // Custom Login URL
  userLogin(userdata: Usercred): Observable<Userinfo[]> {
    return this.httpClient.get<Userinfo[]>(this.baseURL + '?username=' + userdata.username + '&password=' + userdata.password);
  }

  // Check for duplicate user registration
  duplicateUserName(username: string): Observable<Userinfo[]> {
    return this.httpClient.get<Userinfo[]>(this.baseURL + '?username=' + username );
  }

  // Role based Menu Access
  // Function takes the userrole and returns a list of menus based on the role i.e RoleAccess[] 
  getMenuByRole(userrole: string): Observable<RoleAccess[]>{
    return this.httpClient.get<RoleAccess[]>('http://localhost:4000/roleaccess?role=' + userrole)
  }

  // Save user data to local storage
  saveUserToLocalStorage(userdata: Userinfo) {
    localStorage.setItem('userdata', JSON.stringify(userdata))
  }

  // Get user data from local storage upon successful login
  getUserDataFromStrorage(){
    let _obj:Userinfo = {
      id: 0,
      username: '',
      email: '',
      name: '',
      role: '',
      status: false,
    }
    if(localStorage.getItem('userdata') != null){
      let jsonstring = localStorage.getItem('userdata') as string;
      _obj = JSON.parse(jsonstring);
      return _obj;
    } else {
      return _obj;
    }
  }
}
