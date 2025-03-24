import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../types/product.type';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private client: HttpClient,
    private authorizationService: AuthorizationService
  ) { }

  findProducts(): Observable<Product[]> {
    type ProductResponse = {
      id: number
      name: string
      description: string
      categoryName: string
      stock: number
      createdAt: string
      updatedAt: string | null
      deletedAt: string | null
    }
    const url = `http://localhost:8080/api/v1/products`
    const headers = {
      Authorization: `Bearer ${this.authorizationService.getTokenLocalStorage()}`
    }
    return this.client.get<ProductResponse[]>(url, { headers })
      .pipe(
        map(items => {
          return items.map(item => {
            return {
              id: item.id,
              name: item.name,
              description: item.description,
              categoryName: item.categoryName,
              stock: item.stock,
              createdAt: new Date(item.createdAt),
              updatedAt: item.updatedAt ? new Date(item.updatedAt) : null,
              deletedAt: item.deletedAt ? new Date(item.deletedAt) : null
            } as Product
          })
        })
      )
  }
}
