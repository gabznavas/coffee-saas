import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthorizationService } from './authorization.service';
import { map, Observable } from 'rxjs';
import { ProductCategory } from '../types/product-category.type';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  constructor(
    private client: HttpClient,
    private authorizationService: AuthorizationService
  ) { }

  findAll(): Observable<ProductCategory[]> {
    const url = `http://localhost:8080/api/v1/product/category`
    const headers = {
      Authorization: `Bearer ${this.authorizationService.getTokenLocalStorage()}`
    }

    return this.client.get<ProductCategory[]>(url, { headers })
      .pipe(
        map(items => {
          return items.map(item => {
            return {
              id: item.id,
              name: item.name,
            } as ProductCategory
          })
        }),
      )

  }
}
