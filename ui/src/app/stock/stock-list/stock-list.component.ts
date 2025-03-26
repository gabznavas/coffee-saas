import { Component, OnInit } from '@angular/core';
import { Product } from '../../types/product.type';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { ProductCategory } from '../../types/product-category.type';
import { ProductCategoryService } from '../../services/product-category.service';
import { UnitService } from '../../services/unit.service';
import { Unit } from '../../types/unit.type';
import { PaginatedResponse } from '../../types/paginated-response.type';
import { Title } from '@angular/platform-browser';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.scss'
})
export class StockListComponent implements OnInit {

  protected isShowConfirmDelete = false
  protected productSelected: Product | null = null;

  protected list = {
    data: {} as PaginatedResponse<Product>,
    searchInput: '',
    isLoading: false,
    messages: {
      errors: [] as string[],
      info: [] as string[],
    }
  }

  protected categories = [] as ProductCategory[]
  protected units = [] as Unit[]

  constructor(
    private titleService: TitleService,
    private router: Router,
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private unitService: UnitService,
  ) {
    this.titleService.setTitle("Produtos");
  }

  ngOnInit(): void {
    this.findAllProducts()
    this.findAllProductCategories()
    this.findAllUnits()
  }

  protected toggleIsShowConfirmDelete() {
    this.isShowConfirmDelete = !this.isShowConfirmDelete
  }

  protected goToHome() {
    this.router.navigate([""])
  }

  protected deleteProductSelected() {
    if (!this.productSelected) {
      return
    }
    this.list.isLoading = true
    this.productService.deleteProduct(this.productSelected)
      .subscribe({
        next: () => {
          this.isShowConfirmDelete = false
          this.list.messages.info = ['Produto deletado.']
          this.findAllProducts(this.list.searchInput)
          this.list.isLoading = false
        },
        error: err => {
          this.list.isLoading = false
          if (err instanceof HttpErrorResponse) {
            if (err.error.message) {
              this.list.messages.errors.push(err.error.message)
            } else if (err.error.messages) {
              this.list.messages.errors.concat(err.error.messages)
            } else {
              this.list.messages.errors = ['Ocorreu um problema.', 'Tente novamente mais tarde.']
            }
          } else {
            this.list.messages.errors = ['Ocorreu um problema.', 'Tente novamente mais tarde.']
          }
        }
      })
  }

  protected openModalToDelete(product: Product) {
    this.isShowConfirmDelete = true
    this.productSelected = product
  }

  protected getPageCountItems(): number[] {
    return new Array(this.list.data.totalPages).fill('').map((_, index) => index)
  }

  protected isActualPage(actualIndex: number): boolean {
    return this.list.data.page === actualIndex
  }

  protected goToStockForm() {
    this.router.navigate(['/stock/form'])
  }

  protected showPages(): boolean {
    return this.list.data?.content?.length > 0
  }

  protected findCategoryNameById(categoryId: number) {
    const category = this.categories.find(category => category.id === categoryId)
    if (!category) {
      return "-"
    } return category.name
  }

  protected findUnitNameById(unitId: number) {
    const unit = this.units.find(unit => unit.id === unitId)
    if (!unit) {
      return "-"
    } return unit.name
  }

  protected goToUpdateProduct(productId: number) {
    this.router.navigate(['/stock', 'form', productId])
  }

  protected searchByInputQuery() {
    this.findAllProducts(this.list.searchInput)
  }

  protected findAllProducts(query: string = '', page: number = 0, size = 5) {
    this.list.isLoading = true
    this.productService.findProducts(query, page, size)
      .subscribe({
        next: products => {
          this.list.data = products;
          if (this.list.data.content.length === 0) {
            this.list.messages.info = ['Nenhum produto listado.']
          } else {
            this.list.messages.info = []
          }
          this.list.isLoading = false
        },
        error: err => {
          this.list.isLoading = false
          if (err instanceof HttpErrorResponse) {
            if (err.error.message) {
              this.list.messages.errors.push(err.error.message)
            } else if (err.error.messages) {
              this.list.messages.errors.concat(err.error.messages)
            } else {
              this.list.messages.errors = ['Ocorreu um problema.', 'Tente novamente mais tarde.']
            }
          } else {
            this.list.messages.errors = ['Ocorreu um problema.', 'Tente novamente mais tarde.']
          }
        }
      })
  }

  protected goPage(page: number) {
    this.findAllProducts(this.list.searchInput, page)
  }

  protected previousPage() {
    this.findAllProducts(this.list.searchInput, this.list.data.page - 1)
  }

  protected nextPage() {
    this.findAllProducts(this.list.searchInput, this.list.data.page + 1)
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
