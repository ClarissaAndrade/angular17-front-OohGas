import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Deliverer } from '../types/deliverer';
import { catchError, of, tap, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class DelivererService {
  private apiUrl: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  // Listar todos os entregadores
  list(): Observable<Deliverer[]> {
    return this.httpClient.get<Deliverer[]>(`${this.apiUrl}/Deliverers`, httpOptions)
      .pipe(
        tap(deliverers => console.log("Buscou os entregadores")),
        catchError(this.handleError<Deliverer[]>('list', []))
      );
  }

  // Obter um entregador por ID
  get(id: number): Observable<Deliverer> {
    return this.httpClient.get<Deliverer>(`${this.apiUrl}/Deliverers/${id}`, httpOptions)
      .pipe(
        tap(deliverer => console.log(`Buscou o entregador com id=${id}`)),
        catchError(this.handleError<Deliverer>(`getDeliverer id=${id}`))
      );
  }

  // Criar um novo entregador
  create(deliverer: Deliverer): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/Deliverers`, JSON.stringify(deliverer), httpOptions)
      .pipe(
        catchError(this.handleError('create', null))
      );
  }

  // Deletar um entregador por ID
  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/Deliverers/${id}`, httpOptions)
      .pipe(
        catchError(this.handleError('delete', null))
      );
  }

  // Atualizar um entregador por ID
  update(id: number, deliverer: Deliverer): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/Deliverers/${id}`, JSON.stringify(deliverer), httpOptions)
      .pipe(
        tap(() => console.log(`Atualizou o entregador com id=${id}`)),
        catchError(this.handleError('update', null))
      );
  }

  // Tratar os erros genericos
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      // Adicione lógica de erro para diferentes códigos de status
      let errorMessage = '';
      if (error.status === 400) {
        errorMessage = `Erro de requisição: ${error.message}`;
      } else if (error.status === 404) {
        errorMessage = `Entregador não encontrado`;
      } else if (error.status === 500) {
        errorMessage = `Erro interno no servidor`;
      } else {
        errorMessage = `Código de erro: ${error.status} - ${error.message}`;
      }

      // Retorna a mensagem de erro para o componente
      return throwError(() => new Error(errorMessage));
    };
  }
}
