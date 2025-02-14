import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CategoryService } from '../../../core/services/category.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { Category } from '../../../core/types/category';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {

    categories: Category[] = [];
    dataSource = [...this.categories];

    constructor(
      private categoryService: CategoryService, private router: Router, private toastr: ToastrService) {
    }

    ngOnInit(): void {
      this.categoryService.list()
        .subscribe(dados => {
          this.categories = dados;
          this.dataSource = [...this.categories];
          console.log(this.categories);
        });
    }

}
