import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../types/product.type';
import { AuthorizationService } from './authorization.service';
import { ProductResponse } from './types.ts/product-response.type';
import { NewProduct } from './types.ts/new-product.type';
import { environment } from '../../environments/environment';
import { PaginatedResponse } from '../types/paginated-response.type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private client: HttpClient,
    private authorizationService: AuthorizationService
  ) { }

  findProducts(query: string = '', page = 0, size = 5, sortBy = 'name', orderBy = 'asc'): Observable<PaginatedResponse<Product>> {
    const url = `${environment.apiUrl}/v1/products?page=${page}&size=${size}&sort=${sortBy},${orderBy}&query=${query}`
    const headers = {
      Authorization: `Bearer ${this.authorizationService.getTokenLocalStorage()}`
    }
    return this.client.get<PaginatedResponse<ProductResponse>>(url, { headers })
      .pipe(map(this.mapPaginatedResponse))
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
      .pipe(map(this.mapProductResponse))
  }

  deleteProduct(product: Product): Observable<void> {
    const url = `${environment.apiUrl}/v1/products/${product.id}`
    const headers = {
      Authorization: `Bearer ${this.authorizationService.getTokenLocalStorage()}`
    }
    return this.client.delete<void>(url, { headers })
  }


  private mapPaginatedResponse = (paginatedResponse: PaginatedResponse<ProductResponse>): PaginatedResponse<Product> => {
    const products = paginatedResponse.content.map(this.mapProductResponse)
    return {
      content: products,
      page: paginatedResponse.page,
      size: paginatedResponse.size,
      totalElements: paginatedResponse.totalElements,
      totalPages: paginatedResponse.totalPages,
    }
  }

  private mapProductResponse = (item: ProductResponse): Product => {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      categoryId: item.categoryId,
      unitId: item.unitId,
      stock: item.stock,
      price: item.price,
      createdAt: new Date(item.createdAt),
      updatedAt: item.updatedAt ? new Date(item.updatedAt) : null,
    } as Product
  }
}
