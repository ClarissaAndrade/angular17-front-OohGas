import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, of, tap, throwError } from 'rxjs';
import { Client } from '../types/client';


const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class ClientService { private apiUrl: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  // Listar todos os entregadores
  list(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(`${this.apiUrl}/Clients`, httpOptions)
      .pipe(
        tap(clients => console.log("Buscou os clientes")),
        catchError(this.handleError<Client[]>('list', []))
      );
  }

  // Obter um entregador por ID
  get(id: number): Observable<Client> {
    return this.httpClient.get<Client>(`${this.apiUrl}/Clients/${id}`, httpOptions)
      .pipe(
        tap(client => console.log(`Buscou o cliente com id=${id}`)),
        catchError(this.handleError<Client>(`getClient id=${id}`))
      );
  }

  // Criar um novo entregador
  create(client: Client): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/Clients`, JSON.stringify(client), httpOptions)
      .pipe(
        catchError(this.handleError('create', null))
      );
  }

  // Deletar um entregador por ID
  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/Clients/${id}`, httpOptions)
      .pipe(
        catchError(this.handleError('delete', null))
      );
  }

  // Atualizar um entregador por ID
  update(id: number, client: Client): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/Clients/${id}`, JSON.stringify(client), httpOptions)
      .pipe(
        tap(() => console.log(`Atualizou o cliente com id=${id}`)),
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
        errorMessage = `Cliente não encontrado`;
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
