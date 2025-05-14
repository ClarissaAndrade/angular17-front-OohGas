import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, of, tap, throwError } from 'rxjs';
import { Product } from '../types/product';
import { ProductDTO } from '../types/product.dto';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  list(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiUrl}/Products`, httpOptions)
      .pipe(
        tap(products => console.log("Buscou os registros")),
        catchError(this.handleError<Product[]>('list', []))
      );
  }

  get(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiUrl}/Productscd ../${id}`, httpOptions)
      .pipe(
        tap(product => console.log(`Buscou o produto com id=${id}`)),
        catchError(this.handleError<Product>(`getProduct id=${id}`))
      );
  }

  create(product: ProductDTO): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/Products`, JSON.stringify(product), httpOptions)
      .pipe(
        catchError(this.handleError('create', null))
      );
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/Products/${id}`, httpOptions)
      .pipe(
        catchError(this.handleError('delete', null))
      );
  }

  update(id: number, product: Product): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/Products/${id}`, JSON.stringify(product), httpOptions)
      .pipe(
        tap(() => console.log(`Atualizou o produto com id=${id}`)),
        catchError(this.handleError('update', null))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      let errorMessage = '';
      if (error.status === 400) {
        errorMessage = `Erro de requisição: ${error.message}`;
      } else if (error.status === 404) {
        errorMessage = `Registro não encontrado`;
      } else if (error.status === 500) {
        errorMessage = `Erro interno no servidor`;
      } else {
        errorMessage = `Código de erro: ${error.status} - ${error.message}`;
      }

      return throwError(() => new Error(errorMessage));
    };
  }
}
