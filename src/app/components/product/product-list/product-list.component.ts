import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { Product } from '../../../core/types/product';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [  MatTableModule, MatIconModule, MatButtonModule ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'price', 'deliveryFee', 'brandName', 'categoryName', 'status', 'actions'];
  products: Product[] = [];
  dataSource = [...this.products];

  constructor(
    private productService: ProductService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.productService.list()
      .subscribe(dados => {
        this.products = dados;
        this.dataSource = [...this.products];
        console.log(this.products);
      });
  }

  goToTargetPage(): void {
    this.router.navigate(['/produtos/adicionar']);
  }

  delete(id: number) {
    this.productService.delete(id).pipe(
      tap({
        next: (response) => {
          this.toastr.success("Registro deletado com sucesso!", "", {closeButton:true});
        },
        error: (err) => {
          this.toastr.error("Ocorreu um erro ao deletar o registro!", "", {closeButton:true});
          console.log(err);
        },
      })
    ).subscribe({
      next: () => {
        this.productService.list().subscribe({
          next: (dados) => {
            this.products = dados;
            this.dataSource = [...this.products];
          },
          error: (err) => {
            console.error('Erro ao listar os dados:', err);
          },
        });
      },
      error: (err) => {
        console.error('Erro na exclusão:', err);
      },
    });
  }

  editar(id: number) {
    this.router.navigate(['produtos/editar', id]);
  }
}
