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
import { BrandService } from '../../../core/services/brand.service';
import { Brand } from '../../../core/types/brand';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
	selector: 'app-brand-form',
	standalone: true,
	imports: [
		MatInputModule,
		RouterModule,
		MatButtonModule,
		MatSelectModule,
		MatFormFieldModule,
		MatAutocompleteModule,
		ReactiveFormsModule,
		CommonModule
	],
	templateUrl: './brand-form.component.html',
	styleUrl: './brand-form.component.css'
})

export class BrandFormComponent implements OnInit {
	myForm: FormGroup;
	title: string = 'Nova Marca';
	brands: Brand[] = [];
	dataSource = [...this.brands];
	cities: string[] = ['Lindóia', 'Ibirá', 'Monteiro Lobato'];
	filteredCities: string[] = [];

	constructor(
		private fb: FormBuilder,
		private brandService: BrandService,
		private router: Router,
		private toastr: ToastrService
	) {
		this.myForm = this.fb.group({
			nickName: ['', Validators.required],
			legalName: ['', Validators.required],
			cnpj: ['', Validators.required],
			city: ['', Validators.required],
			distance: [null, [Validators.min(1)]]
		});
	}

	ngOnInit(): void {
		this.brandService.list().subscribe((dados) => {
			this.brands = dados;
			this.dataSource = [...this.brands];
		});
		const cityControl = this.myForm.get('city');

		cityControl?.valueChanges.subscribe(value => {
			this.filteredCities = this._filter(value || '');
		});

	}

	onSubmit() {
		console.log(this.myForm);

		if (this.myForm.valid) {
			this.brandService.create(this.myForm.value).subscribe({
				next: (res: any) => {
					this.toastr.success('Registro criado com sucesso!', '', {
						closeButton: true,
					});
					this.router.navigate(['/marcas']);
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

	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.cities.filter(city => city.toLowerCase().includes(filterValue));
	}
}
