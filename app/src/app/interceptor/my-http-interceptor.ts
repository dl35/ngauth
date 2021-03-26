import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';
import {tap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {


    constructor(private router: Router, private snackBar: MatSnackBar) {

    }

 intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  const token: string = sessionStorage.getItem('token');
  if (token) {
    request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
     }
  request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
  return next.handle(request).pipe( tap (
     resp => { } ,
     error => {
       if ( error instanceof HttpErrorResponse ) {

         const status =  (error.status) ? '' + error.status : '500' ;
         const message = (error.statusText ) ? error.statusText : 'error interne ' ;
         this.snackBar.open(message, status, {
            duration: 2000,
          });
       }

       if ( error.status !== 500 ) {
         this.router.navigate(['login']);
       }


    })

  );


   }



}
