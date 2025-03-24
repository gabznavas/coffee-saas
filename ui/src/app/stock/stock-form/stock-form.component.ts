import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../types/product-category.type';
import { ProductCategoryService } from '../../services/product-category.service';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrl: './stock-form.component.scss'
})
export class StockFormComponent implements OnInit {
  form = {
    name: '',
    description: '',
    categories: [] as ProductCategory[],
    isLoading: false,
    messages: {
      errors: [] as string[],
      info: [] as string[]
    }
  }

  constructor(
    private productCategoryService: ProductCategoryService
  ) { }

  ngOnInit(): void {
    this.form.isLoading = true
    this.productCategoryService.findAll()
      .subscribe({
        next: productCategories => {
          productCategories.map(item => {
            this.form.categories.push({
              id: item.id,
              name: item.name,
            })
          })
          this.form.isLoading = false
        },
        error: err => {
          // TODO: add errors
        }
      })
  }

  findAllCategories() {

  }
}
