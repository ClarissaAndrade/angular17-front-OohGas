import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Deliverer } from '../../../core/types/deliverer';
import { DelivererService } from '../../../core/services/deliverer.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';

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
    private delivererService: DelivererService, private router: Router, private toastr: ToastrService) {
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
    this.delivererService.delete(id).pipe(
      tap({
        // Verifica o sucesso da requisição
        next: (response) => {
          this.toastr.success("Registro deletado com sucesso!", "", {closeButton:true});
        },
        // Verifica e lida com erros
        error: (err) => {
          this.toastr.error("Ocorreu um erro ao deletar o registro!", "", {closeButton:true});
          console.log(err);
        },
      })
    ).subscribe({
      // No caso de sucesso, carrega os dados novamente
      next: () => {
        this.delivererService.list().subscribe({
          next: (dados) => {
            this.deliverers = dados;
            this.dataSource = [...this.deliverers];
          },
          error: (err) => {
            console.error('Erro ao listar os dados:', err);
          },
        });
      },
      // No caso de erro, pode exibir uma mensagem amigável
      error: (err) => {
        console.error('Erro na exclusão:', err);
      },
    });
  }
  
  // delete(id: number) {
  //   this.delivererService.delete(id)
  //     .subscribe(response => {
  //       this.delivererService.list()
  //       .subscribe(dados => {
  //         this.deliverers = dados;
  //         this.dataSource = [...this.deliverers];
  //         console.log(this.deliverers);
  //       });
  //     });
  // }

  editar(id: number) {
    this.router.navigate(['entregadores/editar', id]);
  }
}
