import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-deliverer-edit',
  standalone: true,
  imports: [MatInputModule, RouterModule, MatButtonModule, MatSelectModule, MatRadioModule, MatCheckboxModule, MatFormFieldModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule, CommonModule],
  templateUrl: './deliverer-edit.component.html',
  styleUrl: './deliverer-edit.component.css'
})
export class DelivererEditComponent {
  id: number | null = null;
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

  title: string = "Editar Entregador";
  isUpdate: boolean = true;

  constructor(private fb: FormBuilder, private delivererService: DelivererService, private router: Router, private toastr: ToastrService, private route: ActivatedRoute) {
    this.myForm = this.fb.group({
			id: [0, Validators.required],
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

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      this.delivererService.get(this.id).subscribe({
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
			if (this.id !== null) { // Garantimos que o id não seja null
				this.delivererService.update(this.id, this.myForm.value).subscribe({
					next: () => {
						this.toastr.success('Registro atualizado com sucesso!', '', { closeButton: true });
						this.router.navigate(['/entregadores']);
					},
					error: (err) => {
						console.error(err);
						this.toastr.error('Erro ao atualizar o registro.', '', { closeButton: true });
					}
				});
			} else {
				this.toastr.error('ID inválido para atualização.', '', { closeButton: true });
			}
		} else {
			this.toastr.error('Formulário inválido. Verifique os campos obrigatórios.', '', { closeButton: true });
		}
	}	

  patchForm(dados: any) {
    this.myForm.patchValue({
			id: dados.id,
      name: dados.name,
      nickName: dados.nickName,
      dtBirthday: dados.dtBirthday,
      cpf: dados.cpf,
      rg: dados.rg,
      cnh: dados.cnh,
      cnhCategory: dados.cnhCategory,
      dtCnhExpiry: dados.dtCnhExpiry,
      phone: dados.phone,
      status: dados.status
    });
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
