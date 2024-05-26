import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Deliverer } from '../types/deliverer';

@Injectable({
  providedIn: 'root'
})
export class DelivererService {
  private apiUrl: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  list () : Observable<Deliverer[]> {
    return this.httpClient.get<Deliverer[]>(`${this.apiUrl}/Deliverers`)
  }
}
