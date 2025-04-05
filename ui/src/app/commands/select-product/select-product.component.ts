import { Component, OnInit } from '@angular/core';
import { Product } from '../../types/product.type';
import { PaginatedResponse } from '../../types/paginated-response.type';
import { ProductCategory } from '../../types/product-category.type';
import { Unit } from '../../types/unit.type';
import { TitleService } from '../../services/title.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductCategoryService } from '../../services/product-category.service';
import { UnitService } from '../../services/unit.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { CommandItemService } from '../../services/command-item.service';
import { Command } from '../../types/command.type';
import { CommandService } from '../../services/command.service';

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrl: './select-product.component.scss'
})
export class SelectProductComponent implements OnInit {

  isShowProductModal = false;

  commandItem = {
    product: {
      id: 0,
      name: '',
      price: 0,
      stock: 0,
    },
    quantity: 0,
    price: 0,
    observations: '',
  }

  command = {} as Command

  list = {
    data: {} as PaginatedResponse<Product>,
    searchInput: '',
    isLoading: false,
    messages: {
      errors: [] as string[],
      info: [] as string[],
    }
  }

  categories = [] as ProductCategory[]
  units = [] as Unit[]

  constructor(
    private titleService: TitleService,
    private route: ActivatedRoute,
    private locate: Location,
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private commandService: CommandService,
    private commandItemService: CommandItemService,
    private unitService: UnitService,
  ) {
    this.titleService.setTitle("Selecionar Produto");

    this.route.params.subscribe(
      params => {
        const commandId = params['commandId']
        if (commandId) {
          this.command.id = commandId
        }
      }
    )
  }

  ngOnInit(): void {
    this.findAllProducts()
    this.findAllProductCategories()
    this.findAllUnits()
    this.findCommand()
  }

  findCommand() {
    this.commandService.findCommandById(this.command.id)
      .subscribe({
        next: command => {
          this.list.isLoading = false
          this.command = command;
        },
        error: err => {
          this.list.isLoading = false
          if (err instanceof HttpErrorResponse) {
            if (err.error?.message) {
              this.list.messages.errors.push(err.error.message)
            } else if (err.error?.messages) {
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

  cancelAddProductToCommand() {
    this.isShowProductModal = false
  }

  addProductToCommand() {
    if (this.commandItem.product === null) {
      return
    }

    this.commandItemService.addCommandItemToCommand(this.command.id, {
      quantity: this.commandItem.quantity,
      price: this.commandItem.price,
      productId: this.commandItem.product.id,
      observations: this.commandItem.observations,
    }).subscribe({
      next: () => {
        this.list.isLoading = false
        this.locate.back()
      },
      error: err => {
        this.list.isLoading = false
        if (err instanceof HttpErrorResponse) {
          if (err.error?.message) {
            this.list.messages.errors.push(err.error.message)
          } else if (err.error?.messages) {
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

  goBack() {
    this.locate.back()
  }

  getPageCountItems(): number[] {
    return new Array(this.list.data.totalPages).fill('').map((_, index) => index)
  }

  isActualPage(actualIndex: number): boolean {
    return this.list.data.page === actualIndex
  }

  showPages(): boolean {
    return this.list.data?.totalPages > 0 && !this.list.isLoading
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

  selectProduct(product: Product) {
    this.commandItem.product = {
      id: product.id,
      name: product.name,
      stock: product.stock,
      price: product.price,
    }
    this.commandItem.price = product.price
    this.commandItem.quantity = 1
    this.isShowProductModal = true
  }

  searchByInputQuery() {
    this.findAllProducts(this.list.searchInput)
  }

  findAllProducts(query: string = '', page: number = 0, size = 5) {
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

  goPage(page: number) {
    this.findAllProducts(this.list.searchInput, page)
  }

  previousPage() {
    this.findAllProducts(this.list.searchInput, this.list.data.page - 1)
  }

  nextPage() {
    this.findAllProducts(this.list.searchInput, this.list.data.page + 1)
  }

  onCancelAddProduct() {
  }

  onAddProduct() {
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
