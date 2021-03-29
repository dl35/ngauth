import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { shareReplay, catchError } from 'rxjs/operators';
import { MyUser } from '../datas/myuser';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private subject = new BehaviorSubject<MyUser|null>(null) ;
  datas$ = this.subject.asObservable();


  url = "/api/users";
  constructor(private http:  HttpClient ) { }



  get(): any {
   
    this.http.get<MyUser>( this.url   ).pipe(
                      shareReplay(1),
                      catchError(this.errorHandler)
                     ).subscribe(
                         v => this.subject.next( v )

                     )
  }




  errorHandler(error: HttpErrorResponse) {

    return throwError( error ) ;
  }



}
