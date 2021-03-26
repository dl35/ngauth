import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BddService  {

 usports = '/api/bdd/sports' ;


  constructor(private http: HttpClient) { }

  public createSports(): Observable<string> {
    const u = this.usports + '/create';
    return this.http.get<any>( u ).pipe(
          catchError(this.errorHandler)

    ); }

  public deleteSports(): Observable<string> {
      const u = this.usports + '/delete';
      return this.http.get<any>( u ).pipe(
            catchError(this.errorHandler)
      ); }

  public dropSports(): Observable<string> {
        const u = this.usports + '/drop';
        return this.http.get<any>( u ).pipe(
              catchError(this.errorHandler)
        ); }




      errorHandler(error: HttpErrorResponse) {
            const errorMsg = { message: '' , status : 500 };
        
        
            if (error.error instanceof ErrorEvent) {
              errorMsg.message = `Error: ${error.error.message}`;
            } else {
        
              if (!error.status) {
                errorMsg.message = `Unknown Server Error`;
              } else {
                  errorMsg.status =   error.status ; 
                  const merror = ( error.error.message ) ?  error.error.message : error.message ;
                switch (error.status) {
                 

                  case 400: {
                    errorMsg.message = `Bad Request: ${merror}`;
                    break;
                  }
                  case 404: {
                    errorMsg.message = `Not Found: ${merror}`;
                    break;
                  }
                  case 403: {
                    errorMsg.message = `Access Denied: ${merror}`;
                    break;
                  }
                  case 500: {
                    errorMsg.message = `Internal Server Error: ${merror}`;
                    break;
                  }
                  default: {
                    errorMsg.message = `Unknown Server Error: ${merror}`;
                  }
        
                }
              }
        
            }
        
            return throwError(errorMsg);
          }


}


