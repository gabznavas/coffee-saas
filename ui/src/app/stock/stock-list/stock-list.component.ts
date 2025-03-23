import { Component } from '@angular/core';
import { Product } from '../../types/product.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.scss'
})
export class StockListComponent {
  list = {
    data: new Array(10).fill('').map((_, index) => ({
      id: index + 1,
      name: 'Café expresso',
      description: new Array(10).fill('Café da hora ' + index).join(''),
      createdAt: new Date(),
      deletedAt: null,
      updatedAt: null,
      category: {
        id: 1,
        name: 'Café',
      }
    })) as Product[],
    actualPage: 1,
    pageCount: 10,
    itemsPerPage: 10,
  }

  constructor(private router: Router) { }

  getPageCountItems(): number[] {
    return new Array(this.list.pageCount).fill('').map((_, index) => index + 1)
  }

  isActualStyle(actualIndex: number): boolean {
    return this.list.actualPage === actualIndex
  }

  goToStockForm() {
    this.router.navigate(['/stock/form'])
  }
}
