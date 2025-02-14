import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CategoryService } from '../../../core/services/category.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { Category } from '../../../core/types/category';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [ MatTableModule, MatIconModule, MatButtonModule ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'parentCategory', 'actions'];
  categories: Category[] = [];
  dataSource = [...this.categories];

  constructor(
    private categoryService: CategoryService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.categoryService.list()
      .subscribe(dados => {
        this.categories = dados;
        this.dataSource = [...this.categories];
        console.log(this.categories);
      });
  }

  goToTargetPage(): void {
    this.router.navigate(['/categorias/adicionar']);
  }
  
  delete(id: number) {
    this.categoryService.delete(id).pipe(
      tap({
        // Verifica o sucesso da requisição
        next: (response) => {
          this.toastr.success("Registro deletado com sucesso!", "", {closeButton:true});
        },
        // Verifica e lida com erros
        error: (err) => {
          this.toastr.error("Ocorreu um erro ao deletar o registro!", "", {closeButton:true});
          console.log(err);
        },
      })
    ).subscribe({
      // No caso de sucesso, carrega os dados novamente
      next: () => {
        this.categoryService.list().subscribe({
          next: (dados) => {
            this.categories = dados;
            this.dataSource = [...this.categories];
          },
          error: (err) => {
            console.error('Erro ao listar os dados:', err);
          },
        });
      },
      // No caso de erro, pode exibir uma mensagem amigável
      error: (err) => {
        console.error('Erro na exclusão:', err);
      },
    });
  }
  
  editar(id: number) {
    this.router.navigate(['categorias/editar', id]);
  }
}
