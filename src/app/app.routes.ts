import { Routes } from '@angular/router';
import { DelivererComponent } from './components/deliverer/deliverer-list/deliverer.component';
import { DelivererFormComponent } from './components/deliverer/deliverer-form/deliverer-form.component';
import { DelivererEditComponent } from './components/deliverer/deliverer-edit/deliverer-edit.component';

export const routes: Routes = [
    {path: 'entregadores', component: DelivererComponent },
    {path: 'entregadores/adicionar', component: DelivererFormComponent },
    {path: 'entregadores/editar/:id', component: DelivererEditComponent }
];
