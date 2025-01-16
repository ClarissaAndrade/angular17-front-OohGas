import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Deliverer } from '../../core/types/deliverer';
import { DelivererService } from '../../core/services/deliverer.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deliverer',
  standalone: true,
  imports: [ MatTableModule, MatIconModule, MatButtonModule ],
  templateUrl: './deliverer.component.html',
  styleUrl: './deliverer.component.css'
})
export class DelivererComponent implements OnInit {

  displayedColumns: string[] = ['name', 'phone', 'cpf', 'status', 'actions'];
  deliverers: Deliverer[] = [];
  dataSource = [...this.deliverers];

  constructor(
    private delivererService: DelivererService, private router: Router) {
  }

  ngOnInit(): void {
    this.delivererService.list()
      .subscribe(dados => {
        this.deliverers = dados;
        this.dataSource = [...this.deliverers];
        console.log(this.deliverers);
      });
  }

  goToTargetPage(): void {
    this.router.navigate(['/entregadores/adicionar']);
  }

  delete(id: number) {
    this.delivererService.delete(id)
      .subscribe(response => {
        this.delivererService.list()
        .subscribe(dados => {
          this.deliverers = dados;
          this.dataSource = [...this.deliverers];
          console.log(this.deliverers);
        });
      });
  }

    editarElemento(_t60: any) {
    throw new Error('Method not implemented.');
    }
}
