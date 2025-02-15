import { Routes } from '@angular/router';
import { DelivererComponent } from './components/deliverer/deliverer-list/deliverer.component';
import { DelivererFormComponent } from './components/deliverer/deliverer-form/deliverer-form.component';
import { DelivererEditComponent } from './components/deliverer/deliverer-edit/deliverer-edit.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { CategoryFormComponent } from './components/category/category-form/category-form.component';
import { CategoryEditComponent } from './components/category/category-edit/category-edit.component';

export const routes: Routes = [
    {path: 'entregadores', component: DelivererComponent },
    {path: 'entregadores/adicionar', component: DelivererFormComponent },
    {path: 'entregadores/editar/:id', component: DelivererEditComponent },
    {path: 'categorias', component: CategoryListComponent },
    {path: 'categorias/adicionar', component: CategoryFormComponent },
    {path: 'categorias/editar/:id', component: CategoryEditComponent }
];
