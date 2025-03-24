import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../types/product.type';
import { AuthorizationService } from './authorization.service';
import { ProductCategory } from '../types/product-category.type';
import { ProductResponse } from './types.ts/product-response.type';
import { NewProduct } from './types.ts/new-product.type';
import { RouterPreloader } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private client: HttpClient,
    private authorizationService: AuthorizationService
  ) { }

  findProducts(): Observable<Product[]> {
    const url = `${environment.apiUrl}/v1/products`
    const headers = {
      Authorization: `Bearer ${this.authorizationService.getTokenLocalStorage()}`
    }
    return this.client.get<ProductResponse[]>(url, { headers })
      .pipe(
        map(items => items.map(this.productResponseToProduct))
      )
  }

  newProduct(product: NewProduct): Observable<void> {
    const url = `${environment.apiUrl}/v1/products`
    const headers = {
      Authorization: `Bearer ${this.authorizationService.getTokenLocalStorage()}`
    }
    return this.client.post<void>(url, product, { headers })
  }

  updateProduct(productId: number, product: NewProduct): Observable<void> {
    const url = `${environment.apiUrl}/v1/products/${productId}`
    const headers = {
      Authorization: `Bearer ${this.authorizationService.getTokenLocalStorage()}`
    }
    return this.client.patch<void>(url, product, { headers })
  }


  findProductById(productId: number): Observable<Product> {
    const url = `${environment.apiUrl}/v1/products/${productId}`
    const headers = {
      Authorization: `Bearer ${this.authorizationService.getTokenLocalStorage()}`
    }
    return this.client.get<ProductResponse>(url, { headers })
      .pipe(
        map(productResponse => this.productResponseToProduct(productResponse))
      )
  }


  private productResponseToProduct(item: ProductResponse): Product {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      categoryId: item.categoryId,
      unitId: item.unitId,
      stock: item.stock,
      createdAt: new Date(item.createdAt),
      updatedAt: item.updatedAt ? new Date(item.updatedAt) : null,
      deletedAt: item.deletedAt ? new Date(item.deletedAt) : null
    } as Product
  }
}
