import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { Client } from '../../../core/types/client';
import { ClientService } from '../../../core/services/client.service';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [ MatTableModule, MatIconModule, MatButtonModule ],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'phone', 'addressLine', 'addAdditionalInfo', 'status', 'actions'];
  clients: Client[] = [];
  dataSource = [...this.clients];

  constructor(
    private delivererService: ClientService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.delivererService.list()
      .subscribe(dados => {
        this.clients = dados.map(client => ({
          ...client,
          addressLine: `${client.street}, ${client.streetNumber}`
        }));
        this.dataSource = [...this.clients];
        console.log(this.clients);
      });
  }

  goToTargetPage(): void {
    this.router.navigate(['/clientes/adicionar']);
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
            this.clients = dados;
            this.dataSource = [...this.clients];
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

  editar(id: number) {
    this.router.navigate(['clientes/editar', id]);
  }
}