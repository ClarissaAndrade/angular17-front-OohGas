import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../core/types/product';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { Brand } from '../../../core/types/brand';
import { Category } from '../../../core/types/category';
import { BrandService } from '../../../core/services/brand.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    MatInputModule,
    RouterModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {

  myForm: FormGroup;
  title: string = 'Novo Produto';
  brands: Brand[] = [];
  categories: Category[] = [];
  dataSourceCategories = [...this.categories];
  dataSourceBrands = [...this.brands];
  isUpdate = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      price: [null, [Validators.min(1)]],
      caskPrice: [null],
      deliveryFee: [null],
      categoryId: [null, [Validators.min(1)]],
      brandId: [null, [Validators.min(1)]],
      status: [1, Validators.required],
    });
  }

  ngOnInit(): void {
    this.categoryService.list().subscribe((dados) => {
      this.categories = dados;
      this.dataSourceCategories = [...this.categories];
    });
    this.brandService.list().subscribe((dados) => {
      this.brands = dados;
      this.dataSourceBrands = [...this.brands];
    });
  }

  onSubmit() {
    console.log(this.myForm);

    if (this.myForm.valid) {
      this.productService.create(this.myForm.value).subscribe({
        next: (res: any) => {
          this.toastr.success('Registro criado com sucesso!', '', {
            closeButton: true,
          });
          this.router.navigate(['/produtos']);
        },
        error: (err) => {
          console.error(err);
          this.toastr.error('Erro ao criar o registro.', '', {
            closeButton: true,
          });
        },
      });
    } else {
      console.log('Form is invalid');
      this.toastr.error(
        'Formulário inválido. Verifique os campos obrigatórios.',
        '',
        { closeButton: true }
      );
    }
  }
}
