import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../types/product-category.type';
import { ProductCategoryService } from '../../services/product-category.service';
import { NgForm } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Unit } from '../../types/unit.type';
import { UnitService } from '../../services/unit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../types/product.type';
import { HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrl: './stock-form.component.scss'
})
export class StockFormComponent implements OnInit {
  form = this.initForm();

  constructor(
    private titleService: TitleService,
    private router: Router,
    private unitService: UnitService,
    private productCategoryService: ProductCategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = params['productId']
      if (productId) {
        this.form.data.id = Number(productId)
        this.form.isUpdate = true
        this.findProductById(this.form.data.id);
        this.titleService.setTitle("Atualizar produto");
      } else {
        this.titleService.setTitle("Novo produto");
      }
    })

    this.findAllCategories()
    this.findAllUnits()
  }

  findProductById(productId: number) {
    this.productService.findProductById(productId)
      .subscribe({
        next: product => {
          this.form.isLoading = false
          this.setProduct(product)
        },
        error: err => {
          // add err
          this.form.isLoading = false
        }
      })
  }

  onSubmit(form: NgForm) {
    if (this.form.isUpdate) {
      this.updateProduct(form)
    } else {
      this.createProduct(form)
    }
  }

  createProduct(form: NgForm) {
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
        this.clearForm(form);
        this.form.messages.info = ['Produto adicionado.']
        this.form.messages.errors = []
      },
      error: err => {
        this.form.isLoading = false
        if (err instanceof HttpErrorResponse) {
          if (err.error.message && typeof err.error.message === 'string') {
            this.form.messages.errors = [err.error.message]
          } else if (err.error.messages && typeof err.error.messages === 'object') {
            this.form.messages.errors = Object.entries(err.error.messages).map(item => `${item[0]}: ${item[1]}`)
          }
        } else {
          this.form.messages.errors = ['Ocorreu um problema.', 'Tente novamente mais tarde.']
        }
      }
    })
  }


  updateProduct(form: NgForm) {
    const category = this.form.categories.find(category => category.id === Number(this.form.data.categoryId));
    if (!category) {
      this.form.messages.errors.push('Não foi possível concluir o novo produto.', 'Categoria não encontrada.')
      return
    }
    this.form.isLoading = true
    this.productService.updateProduct(
      this.form.data.id, {
      name: this.form.data.name,
      description: this.form.data.description,
      stock: this.form.data.stock,
      categoryId: Number(this.form.data.categoryId),
      unitId: Number(this.form.data.unitId),
    }).subscribe({
      next: () => {
        this.form.isLoading = false
        this.form.messages.info = ['Produto adicionado.']
        this.router.navigate(["/stock"])
        this.clearForm(form);
      },
      error: err => {
        this.form.isLoading = false
        if (err instanceof HttpErrorResponse) {
          if (err.error.message && typeof err.error.message === 'string') {
            this.form.messages.errors = [err.error.message]
          } else if (err.error.messages && typeof err.error.messages === 'object') {
            this.form.messages.errors = Object.entries(err.error.messages).map(item => `${item[0]}: ${item[1]}`)
          }
        } else {
          this.form.messages.errors = ['Ocorreu um problema.', 'Tente novamente mais tarde.']
        }
      }
    })
  }

  goToStockList() {
    this.router.navigate(["/stock"])
  }

  private setProduct(product: Product) {
    this.form.data.id = product.id
    this.form.data.name = product.name
    this.form.data.description = product.description
    this.form.data.stock = product.stock
    this.form.data.unitId = product.unitId.toString()
    this.form.data.categoryId = product.categoryId.toString()
  }

  private clearForm(form?: NgForm) {
    form?.reset({
      name: '',
      description: '',
      category: '1',
      unit: '1',
      stock: 0,
    })
  }

  private initForm() {
    return {
      data: {
        id: 0,
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
      },
      isUpdate: false
    }
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
          this.form.isLoading = false
          if (err instanceof HttpErrorResponse) {
            if (err.error.message && typeof err.error.message === 'string') {
              this.form.messages.errors = [err.error.message]
            } else if (err.error.messages && typeof err.error.messages === 'object') {
              this.form.messages.errors = Object.entries(err.error.messages).map(item => `${item[0]}: ${item[1]}`)
            }
          } else {
            this.form.messages.errors = ['Ocorreu um problema.', 'Tente novamente mais tarde.']
          }
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
          this.form.isLoading = false
          if (err instanceof HttpErrorResponse) {
            if (err.error.message && typeof err.error.message === 'string') {
              this.form.messages.errors = [err.error.message]
            } else if (err.error.messages && typeof err.error.messages === 'object') {
              this.form.messages.errors = Object.entries(err.error.messages).map(item => `${item[0]}: ${item[1]}`)
            }
          } else {
            this.form.messages.errors = ['Ocorreu um problema.', 'Tente novamente mais tarde.']
          }
        }
      })
  }
}
