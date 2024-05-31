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

interface CnhCategories {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-deliverer-form',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, MatSelectModule, MatRadioModule, MatCheckboxModule, MatFormFieldModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule],
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

  constructor(private fb: FormBuilder) {
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
      status: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

}
