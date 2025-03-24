import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../types/product-category.type';
import { ProductCategoryService } from '../../services/product-category.service';
import { NgForm } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Unit } from '../../types/unit.type';
import { UnitService } from '../../services/unit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../types/product.type';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrl: './stock-form.component.scss'
})
export class StockFormComponent implements OnInit {

  form = this.initForm();

  constructor(
    private router: Router,
    private unitService: UnitService,
    private productCategoryService: ProductCategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.findAllCategories()
    this.findAllUnits()
    this.route.params.subscribe(params => {
      this.form.data.id = Number(params['productId'])
      this.form.isUpdate = true
      this.findProductById(this.form.data.id);
    })
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
        this.form.messages.info = ['Produto adicionado.']
        this.clearForm(form);
      },
      error: err => {
        // add err
        this.form.isLoading = false
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
        // add err
        this.form.isLoading = false
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
    if (form) {
      form.reset()
    }
    this.form = this.initForm();
  }

  private initForm() {
    return {
      data: {
        id: 0,
        name: '',
        description: '',
        categoryId: '',
        unitId: '',
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
