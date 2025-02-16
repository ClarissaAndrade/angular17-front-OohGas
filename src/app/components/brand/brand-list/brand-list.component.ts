import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { BrandService } from '../../../core/services/brand.service';
import { Brand } from '../../../core/types/brand';

@Component({
  selector: 'app-brand-list',
  standalone: true,
  imports: [ MatTableModule, MatIconModule, MatButtonModule ],
  templateUrl: './brand-list.component.html',
  styleUrl: './brand-list.component.css',
})
export class BrandListComponent implements OnInit {
  displayedColumns: string[] = ['nickName', 'legalName', 'city', 'actions'];
  brands: Brand[] = [];
  dataSource = [...this.brands];

  constructor(
    private brandService: BrandService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.brandService.list().subscribe((dados) => {
      this.brands = dados;
      this.dataSource = [...this.brands];
      console.log(this.brands);
    });
  }

  goToTargetPage(): void {
    this.router.navigate(['/marcas/adicionar']);
  }

  delete(id: number) {
    this.brandService
      .delete(id)
      .pipe(
        tap({
          // Verifica o sucesso da requisição
          next: (response) => {
            this.toastr.success('Registro deletado com sucesso!', '', {
              closeButton: true,
            });
          },
          // Verifica e lida com erros
          error: (err) => {
            this.toastr.error('Ocorreu um erro ao deletar o registro!', '', {
              closeButton: true,
            });
            console.log(err);
          },
        })
      )
      .subscribe({
        // No caso de sucesso, carrega os dados novamente
        next: () => {
          this.brandService.list().subscribe({
            next: (dados) => {
              this.brands = dados;
              this.dataSource = [...this.brands];
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
    this.router.navigate(['marcas/editar', id]);
  }
}
