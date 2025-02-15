import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../core/services/category.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../../../core/types/category';

@Component({
  selector: 'app-category-edit',
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
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.css'
})
export class CategoryEditComponent implements OnInit {
  myForm: FormGroup;
  title: string = 'Nova Categoria';
  categories: Category[] = [];
  dataSource = [...this.categories];
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.myForm = this.fb.group({
      id: [0, Validators.required],
      name: ['', Validators.required],
      idFather: [null, [Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.categoryService.list().subscribe((dados) => {
      this.categories = dados;
      this.dataSource = [...this.categories];
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      this.categoryService.get(this.id).subscribe({
        next: (dados) => {
          this.patchForm(dados);
        },
        error: (err) => {
          console.error(err);
          this.toastr.error('Erro ao carregar dados do entregador.', '', { closeButton: true });
        }
      });
    }
  }

  onSubmit() {
    if (this.myForm.valid) {
      if (this.id !== null) {
        // Garantimos que o id não seja null
        this.categoryService.update(this.id, this.myForm.value).subscribe({
          next: () => {
            this.toastr.success('Registro atualizado com sucesso!', '', {
              closeButton: true,
            });
            this.router.navigate(['/categorias']);
          },
          error: (err) => {
            console.error(err);
            this.toastr.error('Erro ao atualizar o registro.', '', {
              closeButton: true,
            });
          },
        });
      } else {
        this.toastr.error('ID inválido para atualização.', '', {
          closeButton: true,
        });
      }
    } else {
      this.toastr.error(
        'Formulário inválido. Verifique os campos obrigatórios.',
        '',
        { closeButton: true }
      );
    }
  }

  patchForm(dados: any) {
    this.myForm.patchValue({
      id: dados.id,
      name: dados.name,
      idFather: dados.idFather
    });
  }
}
