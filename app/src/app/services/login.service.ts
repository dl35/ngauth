import { Muser } from './../datas/muser';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isNamedExportBindings } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = '/api/login' ;

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
  isAdmin() {
     return ( sessionStorage.getItem('role') === 'admin' ) 

  }


}
