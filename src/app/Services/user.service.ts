import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usercred, Userinfo, Users } from '../Model/User.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = 'http://localhost:4000/user';

  constructor(private httpClient: HttpClient) { }

  userRegistration(userdata: Users){
    return this.httpClient.post(this.baseURL, userdata);
  }

  // Custom Login URL
  userLogin(userdata: Usercred): Observable<Userinfo[]> {
    return this.httpClient.get<Userinfo[]>(this.baseURL + '?username=' + userdata.username + '&password=' + userdata.password);
  }

  duplicateUserName(username: string) {
    return this.httpClient.get<Userinfo[]>(this.baseURL + '?username=' + username );
  }

  saveUserToLocalStorage(userdata: Userinfo) {
    localStorage.setItem('userdata', JSON.stringify(userdata))
  }

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
