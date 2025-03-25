import { Component, OnInit } from '@angular/core';
import { Product } from '../../types/product.type';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { ProductCategory } from '../../types/product-category.type';
import { ProductCategoryService } from '../../services/product-category.service';
import { UnitService } from '../../services/unit.service';
import { Unit } from '../../types/unit.type';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.scss'
})
export class StockListComponent implements OnInit {
  isShowConfirmDelete = false
  productSelected: Product | null = null;

  list = {
    data: [] as Product[],
    actualPage: 1,
    pageCount: 10,
    itemsPerPage: 10,
    messages: {
      errors: [] as string[],
      info: [] as string[],
    }
  }

  categories = [] as ProductCategory[]
  units = [] as Unit[]

  constructor(
    private router: Router,
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private unitService: UnitService,
  ) { }

  ngOnInit(): void {
    this.findAllProducts()
    this.findAllProductCategories()
    this.findAllUnits()
  }

  toggleIsShowConfirmDelete() {
    this.isShowConfirmDelete = !this.isShowConfirmDelete
  }

  deleteProductSelected() {
    if (!this.productSelected) {
      return
    }
    this.isShowConfirmDelete = false
    this.productService.deleteProduct(this.productSelected)
      .subscribe({
        next: () => {
          debugger
          this.isShowConfirmDelete = false
          this.list.messages.info = ['Produto deletado.']
          this.findAllProducts()
        },
        error: err => {

        }
      })
  }

  openModalToDelete(product: Product) {
    this.isShowConfirmDelete = true
    this.productSelected = product
  }

  getPageCountItems(): number[] {
    return new Array(this.list.pageCount).fill('').map((_, index) => index + 1)
  }

  isActualStyle(actualIndex: number): boolean {
    return this.list.actualPage === actualIndex
  }

  goToStockForm() {
    this.router.navigate(['/stock/form'])
  }

  showPages(): boolean {
    return this.list.data.length > 0
  }

  findCategoryNameById(categoryId: number) {
    const category = this.categories.find(category => category.id === categoryId)
    if (!category) {
      return "-"
    } return category.name
  }

  findUnitNameById(unitId: number) {
    const unit = this.units.find(unit => unit.id === unitId)
    if (!unit) {
      return "-"
    } return unit.name
  }

  goToUpdateProduct(productId: number) {
    this.router.navigate(['/stock', 'form', productId])
  }

  private findAllProducts() {
    this.productService.findProducts()
      .subscribe({
        next: products => {
          this.list.data = products;
          if (this.list.data.length === 0) {
            this.list.messages.info.push('Nenhum produto listado.')
          }
        },
        error: err => {
          if (err instanceof HttpErrorResponse) {
            if (err.error.message) {
              this.list.messages.errors.push(err.error.message)
            } else if (err.error.messages) {
              this.list.messages.errors.concat(err.error.messages)
            } else {
              this.list.messages.errors.push('Ocorreu um problema.', 'Tente novamente mais tarde.')
            }
          } else {
            this.list.messages.errors.push('Ocorreu um problema.', 'Tente novamente mais tarde.')
          }
        }
      })
  }

  private findAllProductCategories() {
    this.productCategoryService.findAll()
      .subscribe({
        next: categories => {
          this.categories = categories;
          if (this.categories.length === 0) {
            this.list.messages.errors = ['Ocorreu um problema.', 'Tente novamente mais tarde.']
          }
        },
        error: err => {
          if (err instanceof HttpErrorResponse) {
            if (err.error.message) {
              this.list.messages.errors.push(err.error.message)
            } else if (err.error.messages) {
              this.list.messages.errors.concat(err.error.messages)
            } else {
              this.list.messages.errors.push('Ocorreu um problema.', 'Tente novamente mais tarde.')
            }
          } else {
            this.list.messages.errors.push('Ocorreu um problema.', 'Tente novamente mais tarde.')
          }
        }
      })
  }


  private findAllUnits() {
    this.unitService.findAll()
      .subscribe({
        next: units => {
          this.units = units;
          if (this.units.length === 0) {
            this.list.messages.errors = ['Ocorreu um problema.', 'Tente novamente mais tarde.']
          }
        },
        error: err => {
          if (err instanceof HttpErrorResponse) {
            if (err.error.message) {
              this.list.messages.errors.push(err.error.message)
            } else if (err.error.messages) {
              this.list.messages.errors.concat(err.error.messages)
            } else {
              this.list.messages.errors.push('Ocorreu um problema.', 'Tente novamente mais tarde.')
            }
          } else {
            this.list.messages.errors.push('Ocorreu um problema.', 'Tente novamente mais tarde.')
          }
        }
      })
  }
}
