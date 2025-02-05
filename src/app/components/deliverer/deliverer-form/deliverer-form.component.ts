import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { DelivererService } from '../../../core/services/deliverer.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


interface CnhCategories {
	value: string;
	viewValue: string;
}

@Component({
	selector: 'app-deliverer-form',
	standalone: true,
	imports: [MatInputModule, RouterModule, MatButtonModule, MatSelectModule, MatRadioModule, MatCheckboxModule, MatFormFieldModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule, CommonModule],
	providers: [],
	templateUrl: './deliverer-form.component.html',
	styleUrl: './deliverer-form.component.css'
})
export class DelivererFormComponent {

	myForm: FormGroup;
	
	cnhCategories: CnhCategories[] = [
		{value: 'A', viewValue: 'A'},
		{value: 'B', viewValue: 'B'},
		{value: 'AB', viewValue: 'AB'},
		{value: 'D', viewValue: 'D'},
		{value: 'AD', viewValue: 'AD'},
		{value: 'E', viewValue: 'E'},
		{value: 'AE', viewValue: 'AE'}
	];

	title: string = "Novo Entregador";
	isUpdate: boolean = false;

	constructor(private fb: FormBuilder, private delivererService: DelivererService, private router: Router, private toastr: ToastrService) {
		this.myForm = this.fb.group({
			name: ['', Validators.required],
			nickName: ['', Validators.required],
			dtBirthday: ['', Validators.required],
			cpf: ['', Validators.required],
			rg: ['', Validators.required],
			cnh: ['', Validators.required],
			cnhCategory: ['', Validators.required],
			dtCnhExpiry: ['', Validators.required],
			phone: ['', Validators.required],
			status: [1, Validators.required]
		});
	}

	onSubmit() {
		console.log(this.myForm);
	
		if (this.myForm.valid) {
			this.delivererService.create(this.myForm.value).subscribe({
				next: (res: any) => {
					this.toastr.success('Registro criado com sucesso!', '', {closeButton:true});
					this.router.navigate(['/entregadores']);
				},
				error: (err) => {
					console.error(err);
					this.toastr.error('Erro ao criar o registro.', '', {closeButton:true});
				},
			});
		} else {
			console.log('Form is invalid');
			this.toastr.error('Formulário inválido. Verifique os campos obrigatórios.', '', {closeButton:true});
		}
	}

	onlyNumbers(event: KeyboardEvent): boolean {
		const charCode = event.key.charCodeAt(0);
		if (charCode < 48 || charCode > 57) {
			event.preventDefault();
			return false; // Bloqueia caracteres não numéricos
		}
		return true;
	}

}
