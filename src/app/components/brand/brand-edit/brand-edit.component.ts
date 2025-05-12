import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from '../../../core/types/brand';
import { BrandService } from '../../../core/services/brand.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-brand-edit',
  standalone: true,
  imports: [
    MatInputModule,
    RouterModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatAutocompleteModule
  ],
  templateUrl: './brand-edit.component.html',
  styleUrl: './brand-edit.component.css'
})
export class BrandEditComponent implements OnInit  {
  myForm: FormGroup;
  title: string = 'Editar Marca';
  brands: Brand[] = [];
  id: number | null = null;
  cities: string[] = ['Lindóia', 'Ibirá', 'Monteiro Lobato'];
	filteredCities: string[] = [];

  constructor(
    private fb: FormBuilder,
    private brandService: BrandService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.myForm = this.fb.group({
      id: [0, Validators.required],
			nickName: ['', Validators.required],
			legalName: ['', Validators.required],
			cnpj: ['', Validators.required],
			city: ['', Validators.required],
			distance: [null, [Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    const cityControl = this.myForm.get('city');

		cityControl?.valueChanges.subscribe(value => {
			this.filteredCities = this._filter(value || '');
		});

    const paramId = this.route.snapshot.paramMap.get('id');
    this.id = paramId !== null ? Number(paramId) : null;

    if (this.id && !isNaN(this.id)) {
      this.brandService.get(this.id).subscribe({
        next: (dados) => {
          this.patchForm(dados);
        },
        error: (err) => {
          console.error('Erro: ' + err.message);
          this.toastr.error('Erro ao carregar dados .', '', { closeButton: true });
        }
      });
    }
  }

  onSubmit() {
    if (this.myForm.valid) {
      if (this.id !== null) {
        // Garantimos que o id não seja null
        this.brandService.update(this.id, this.myForm.value).subscribe({
          next: () => {
            this.toastr.success('Registro atualizado com sucesso!', '', {
              closeButton: true,
            });
            this.router.navigate(['/marcas']);
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
    try{
      this.myForm.patchValue({
        id: dados.id,
        nickName: dados.nickName,
        legalName: dados.legalName,
        cnpj: dados.cnpj,
        city: dados.city,
        distance: dados.distance
      });
    }
    catch(e){
      console.log(e);
    }
  }

  private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.cities.filter(city => city.toLowerCase().includes(filterValue));
	}
}
