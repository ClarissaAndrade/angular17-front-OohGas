import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Deliverer } from '../types/deliverer';
import { catchError, of, tap, throwError } from 'rxjs';

var httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};

@Injectable({
  providedIn: 'root'
})
export class DelivererService {
  private apiUrl: string = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  list () : Observable<Deliverer[]> {
    return this.httpClient.get<Deliverer[]>(`${this.apiUrl}/Deliverers`, httpOptions)
    .pipe(
      tap(Deliveres => console.log("Buscou os entregadores")),
      catchError(this.handleError('getDeliverers', []))
    );
  }

  create(deliverer:Deliverer): Observable<any> {
  
    return this.httpClient.post(`${this.apiUrl}/Deliverers`, JSON.stringify(deliverer), this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }

  private errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
