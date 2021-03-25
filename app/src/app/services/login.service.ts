import { Muser } from './../datas/muser';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = '/ws/public/visu/signup' ;

  constructor(private http: HttpClient) {
  }

  signup( value: any ) {
    return this.http.post<Muser>( this.url  , value) ;
  }

  signout() {
     sessionStorage.clear();
  }

 checkCredentials() {
  if (sessionStorage.getItem('token') === null) {
    return false;
  } else {
    return true;
  }

}
}
