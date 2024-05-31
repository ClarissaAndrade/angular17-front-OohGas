import { Routes } from '@angular/router';
import { DelivererComponent } from './components/deliverer/deliverer.component';
import { DelivererFormComponent } from './components/deliverer-form/deliverer-form.component';

export const routes: Routes = [
    {path: 'entregadores', component: DelivererComponent },
    {path: 'entregadores/adicionar', component: DelivererFormComponent }
];
