import { catchError, map, shareReplay, switchMap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { MySportsPage } from '../datas/mysportspage';
import { MySports } from '../datas/mysports';

@Injectable({
  providedIn: 'root'
})
export class Sports1Service {

  private subject = new BehaviorSubject<MySportsPage|null>(null) ;
  datas$ = this.subject.asObservable();
 
  url = "/api/sports";
  constructor(private http:  HttpClient ) { }

  get(page: number , search: string): any {
    let surl =this.url + '/pages/' +  page ;
    let params = {};
    if( search ) {
    params = new HttpParams().set('search', search ) ;
        }
    this.http.get<MySportsPage>( surl ,  {params}   ).pipe(
                      shareReplay(1),
                      catchError(this.errorHandler)
                     ).subscribe(
                          m => this.subject.next(m)
                     )
  }

  delete(id: number): any {
    let surl =this.url +'/'+ id ;
    this.http.delete<any>( surl  ).pipe(
                    catchError(this.errorHandler)
                    ).subscribe(
                          m => {

                            let o = this.subject.getValue() ;
                            let datas: MySports[] = o.datas;
                            let datas2 = datas.filter((m) => m.id !== id);
                            o.datas = datas2;
                            o.total--;
                            this.subject.next( o ) 
                          }
    )
  }
  post(sport: MySports): any {
    let surl =this.url + '/pages/' + 1 ;
    this.http.post<any>( this.url , sport ).pipe(
              catchError(this.errorHandler) ,
              switchMap( m =>   this.http.get<MySportsPage>( surl  ) )
              ).subscribe(
                  m =>  this.subject.next(m)
              )
  }

  put(id:number , sport: MySports): any {
    let surl =this.url +'/'+ id ;
    
    this.http.put<any>( surl , sport ).subscribe(
                m => {
                  let o = this.subject.getValue() ;
                  let datas: MySports[] = o.datas;
                  let index = datas.findIndex((m) => m.id === id );
                  sport.id = id ;
                  datas[index] = sport  ;
                  o.datas = datas;
                 
                  this.subject.next( o ) 
                }
    )
  }


  search(datas: any ){
    let surl = this.url + '/pages/1' ;
    this.http.post<MySportsPage>( surl  , datas ).pipe(
      catchError(this.errorHandler)
     ).subscribe(
          m => this.subject.next(m)
     )

  }



/*
  sort() {
    let datas : MySports[] = this.subject.getValue().sort((a,b) => this.predicat(a,b)) ;
    this.subject.next( datas ) 

  }

  private predicat( a, b ) {
    return (a.title < b.title ? -1 : 1)
  }
*/

  errorHandler(error: HttpErrorResponse) {

    return throwError( error ) ;
  }


}
