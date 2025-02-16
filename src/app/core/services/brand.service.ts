import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, of, tap, throwError } from 'rxjs';
import { BrandDTO } from '../types/brand.dto';
import { Brand } from '../types/brand';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private apiUrl: string = environment.apiUrl;

	constructor(
		private httpClient: HttpClient
	) { }

    // Listar todos os entregadores
    list(): Observable<BrandDTO[]> {
      return this.httpClient.get<BrandDTO[]>(`${this.apiUrl}/Brands`, httpOptions)
        .pipe(
          tap(brands => console.log(brands)),
          catchError(this.handleError<BrandDTO[]>('list', []))
        );
    }
  
    get(id: number): Observable<Brand> {
      return this.httpClient.get<Brand>(`${this.apiUrl}/Brands/${id}`, httpOptions)
        .pipe(
          tap(brand => console.log(`Buscou a marca com id=${id}`)),
          catchError(this.handleError<Brand>(`getBrand id=${id}`))
        );
    }
  
    create(brand: BrandDTO): Observable<any> {
      return this.httpClient.post(`${this.apiUrl}/Brands`, JSON.stringify(brand), httpOptions)
        .pipe(
          catchError(this.handleError('create', null))
        );
    }
  
    delete(id: number): Observable<any> {
      return this.httpClient.delete(`${this.apiUrl}/Brands/${id}`, httpOptions)
        .pipe(
          catchError(this.handleError('delete', null))
        );
    }
  
    update(id: number, brand: Brand): Observable<any> {
      return this.httpClient.put(`${this.apiUrl}/Brands/${id}`, JSON.stringify(brand), httpOptions)
        .pipe(
          tap(() => console.log(`Atualizou a marca com id=${id}`)),
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
          errorMessage = `Marca não encontrada`;
        } else if (error.status === 500) {
          errorMessage = `Erro interno no servidor`;
        } else {
          errorMessage = `Código de erro: ${error.status} - ${error.message}`;
        }
  
        return throwError(() => new Error(errorMessage));
      };
    }
}
