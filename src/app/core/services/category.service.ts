import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, of, tap, throwError } from 'rxjs';
import { Category } from '../types/category';
import { CategoryDTO } from '../types/category.dto';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

 private apiUrl: string = environment.apiUrl;

	constructor(
		private httpClient: HttpClient
	) { }

	list(): Observable<Category[]> {
		return this.httpClient.get<Category[]>(`${this.apiUrl}/Categories`, httpOptions)
			.pipe(
				tap(categories => console.log("Buscou as categorias")),
				catchError(this.handleError<Category[]>('list', []))
			);
	}

	get(id: number): Observable<Category> {
		return this.httpClient.get<Category>(`${this.apiUrl}/Categories/${id}`, httpOptions)
			.pipe(
				tap(category => console.log(`Buscou a categoria com id=${id}`)),
				catchError(this.handleError<Category>(`getCategory id=${id}`))
			);
	}

	create(category: CategoryDTO): Observable<any> {
		return this.httpClient.post(`${this.apiUrl}/Categories`, JSON.stringify(category), httpOptions)
			.pipe(
				catchError(this.handleError('create', null))
			);
	}

	delete(id: number): Observable<any> {
		return this.httpClient.delete(`${this.apiUrl}/Categories/${id}`, httpOptions)
			.pipe(
				catchError(this.handleError('delete', null))
			);
	}

	update(id: number, category: Category): Observable<any> {
		return this.httpClient.put(`${this.apiUrl}/Categories/${id}`, JSON.stringify(category), httpOptions)
			.pipe(
				tap(() => console.log(`Atualizou a categoria com id=${id}`)),
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
				errorMessage = `Categoria não encontrada`;
			} else if (error.status === 500) {
				errorMessage = `Erro interno no servidor`;
			} else {
				errorMessage = `Código de erro: ${error.status} - ${error.message}`;
			}

			return throwError(() => new Error(errorMessage));
		};
	}
}
