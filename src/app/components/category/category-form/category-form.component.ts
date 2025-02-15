import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../core/services/category.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../../../core/types/category';

@Component({
  selector: 'app-category-form',
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
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css',
})
export class CategoryFormComponent implements OnInit {
  myForm: FormGroup;
  title: string = 'Nova Categoria';
  categories: Category[] = [];
  dataSource = [...this.categories];

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      idFather: [null, [Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.categoryService.list().subscribe((dados) => {
      this.categories = dados;
      this.dataSource = [...this.categories];
    });
  }

  onSubmit() {
    console.log(this.myForm);

    if (this.myForm.valid) {
      this.categoryService.create(this.myForm.value).subscribe({
        next: (res: any) => {
          this.toastr.success('Registro criado com sucesso!', '', {
            closeButton: true,
          });
          this.router.navigate(['/categorias']);
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
