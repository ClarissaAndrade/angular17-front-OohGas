import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Deliverer } from '../types/deliverer';
import { catchError, of, tap } from 'rxjs';

var httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};

@Injectable({
  providedIn: 'root'
})
export class DelivererService {
  private apiUrl: string = environment.apiUrl;

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

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
