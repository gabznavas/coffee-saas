import { Component } from '@angular/core';
import { Product } from '../../types/product.type';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { HttpErrorResponse, HttpResponseBase } from '@angular/common/http';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.scss'
})
export class StockListComponent {

  list = {
    // data: new Array(10).fill('').map((_, index) => ({
    //   id: index + 1,
    //   name: 'Café expresso',
    //   description: new Array(10).fill('Café da hora ' + index).join(''),
    //   createdAt: new Date(),
    //   deletedAt: null,
    //   updatedAt: null,
    //   category: {
    //     id: 1,
    //     name: 'Café',
    //   }
    // })) as Product[],
    data: [] as Product[],
    actualPage: 1,
    pageCount: 10,
    itemsPerPage: 10,
    messages: {
      errors: [] as string[],
      info: [] as string[],
    }
  }

  constructor(
    private router: Router,
    private productService: ProductService
  ) {
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
}
