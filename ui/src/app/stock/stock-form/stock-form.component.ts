import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../types/product-category.type';
import { ProductCategoryService } from '../../services/product-category.service';
import { NgForm } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Unit } from '../../types/unit.type';
import { UnitService } from '../../services/unit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrl: './stock-form.component.scss'
})
export class StockFormComponent implements OnInit {

  form = {
    data: {
      name: '',
      description: '',
      categoryId: '1',
      unitId: '1',
      stock: 0,
    },
    categories: [] as ProductCategory[],
    units: [] as Unit[],
    isLoading: false,
    messages: {
      errors: [] as string[],
      info: [] as string[]
    }
  }

  constructor(
    private router: Router,
    private unitService: UnitService,
    private productCategoryService: ProductCategoryService,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.findAllCategories()
    this.findAllUnits()
  }

  onSubmit(form: NgForm) {
    const category = this.form.categories.find(category => category.id === Number(this.form.data.categoryId));
    if (!category) {
      this.form.messages.errors.push('Não foi possível concluir o novo produto.', 'Categoria não encontrada.')
      return
    }
    this.form.isLoading = true
    this.productService.newProduct({
      name: this.form.data.name,
      description: this.form.data.description,
      stock: this.form.data.stock,
      categoryId: Number(this.form.data.categoryId),
      unitId: Number(this.form.data.unitId),
    }).subscribe({
      next: () => {
        this.form.isLoading = false
        this.form.messages.info = ['Produto adicionado.']
      },
      error: err => {
        // add err
        this.form.isLoading = false
      }
    })
  }

  goToStockList() {
    this.router.navigate(["/stock"])
  }

  private findAllCategories() {
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
          this.form.isLoading = false
        }
      })
  }

  private findAllUnits() {
    this.unitService.findAll()
      .subscribe({
        next: units => {
          units.map(unit => {
            this.form.units.push({
              id: unit.id,
              name: unit.name,
              acronym: unit.acronym,
            })
          })
          this.form.isLoading = false
        },
        error: err => {
          // TODO: add errors
          this.form.isLoading = false
        }
      })
  }
}
