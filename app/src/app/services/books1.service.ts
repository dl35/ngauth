import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { MyBooks } from '../datas/mybooks';

@Injectable({
  providedIn: 'root'
})
export class Books1Service {


  url = '/books/list';
  constructor(private http: HttpClient) { }

  getDatas(): Observable<MyBooks[]> {
    return this.http.get<MyBooks[]>(this.url).pipe(
      shareReplay(1),
      catchError(this.errorHandler)
    );

  }

  errorHandler(error: HttpErrorResponse) {
    const errorMsg = { message: '' };


    if (error.error instanceof ErrorEvent) {
      errorMsg.message = `Error: ${error.error.message}`;
    } else {

      if (!error.status) {
        errorMsg.message = `Unknown Server Error`;
      } else {

        switch (error.status) {

          case 400: {
            errorMsg.message = `Bad Request: ${error.message}`;
            break;
          }
          case 404: {
            errorMsg.message = `Not Found: ${error.message}`;
            break;
          }
          case 403: {
            errorMsg.message = `Access Denied: ${error.message}`;
            break;
          }
          case 500: {
            errorMsg.message = `Internal Server Error: ${error.message}`;
            break;
          }
          default: {
            errorMsg.message = `Unknown Server Error: ${error.message}`;
          }

        }
      }

    }

    return throwError(errorMsg);
  }

 
}
