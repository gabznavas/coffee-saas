import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PaginatedResponse } from '../types/paginated-response.type';
import { DiningTable } from '../types/dining-table.type';
import { environment } from '../../environments/environment';
import { AuthorizationService } from './authorization.service';
import { HttpClient } from '@angular/common/http';
import { DiningTableResponse } from './types.ts/table-response.type';
import { CreateDiningTableRequest } from './types.ts/create-dining-table-request.type';
import { UpdateDiningTableRequest } from './types.ts/update-dining-table-request.type';


@Injectable({
  providedIn: 'root'
})
export class DiningTableService {


  constructor(
    private client: HttpClient,
    private authorizationService: AuthorizationService
  ) { }

  findAllDiningTables(
    query: string = '', page = 0, size = 5, sortBy = 'name,createdAt', orderBy = 'asc'
  ): Observable<PaginatedResponse<DiningTable>> {
    const url = `${environment.apiUrl}/v1/dining-table?page=${page}&size=${size}&sort=${sortBy},${orderBy}&query=${query}`
    const headers = {
      Authorization: `Bearer ${this.authorizationService.getTokenLocalStorage()}`
    }

    return this.client.get<PaginatedResponse<DiningTableResponse>>(url, { headers })
      .pipe(
        map(paginatedTableResponse => this.mapPaginatedResponseToTable(paginatedTableResponse)),
      )
  }

  findAllDiningTablesByBusy(busy: boolean): Observable<DiningTable[]> {
    const url = `${environment.apiUrl}/v1/dining-table/busy/${busy}`
    const headers = {
      Authorization: `Bearer ${this.authorizationService.getTokenLocalStorage()}`
    }
    return this.client.get<DiningTableResponse[]>(url, { headers })
      .pipe(map(tableResponses => tableResponses.map(this.mapResponseToTable)))
  }

  createDiningTable(data: CreateDiningTableRequest): Observable<DiningTable> {
    const url = `${environment.apiUrl}/v1/dining-table`
    const headers = {
      Authorization: `Bearer ${this.authorizationService.getTokenLocalStorage()}`
    }

    return this.client.post<DiningTableResponse>(url, data, { headers })
      .pipe(map(tableResponse => this.mapResponseToTable(tableResponse)))
  }

  updateDiningTable(dinigTableId: number, data: UpdateDiningTableRequest): Observable<void> {
    const url = `${environment.apiUrl}/v1/dining-table/${dinigTableId}`
    const headers = {
      Authorization: `Bearer ${this.authorizationService.getTokenLocalStorage()}`
    }
    return this.client.patch<void>(url, data, { headers })
  }

  findDiningTableById(diningTableId: number) {
    const url = `${environment.apiUrl}/v1/dining-table/${diningTableId}`
    const headers = {
      Authorization: `Bearer ${this.authorizationService.getTokenLocalStorage()}`
    }

    return this.client.get<DiningTableResponse>(url, { headers })
      .pipe(map(tableResponse => this.mapResponseToTable(tableResponse)))
  }

  deleteDiningTableById(diningTableId: number): Observable<void> {
    const url = `${environment.apiUrl}/v1/dining-table/${diningTableId}`
    const headers = {
      Authorization: `Bearer ${this.authorizationService.getTokenLocalStorage()}`
    }

    return this.client.delete<void>(url, { headers })
  }

  private mapPaginatedResponseToTable(
    paginatedTableResponse: PaginatedResponse<DiningTableResponse>
  ): PaginatedResponse<DiningTable> {
    return {
      content: paginatedTableResponse.content.map(item => this.mapResponseToTable(item)),
      page: paginatedTableResponse.page,
      size: paginatedTableResponse.size,
      totalElements: paginatedTableResponse.totalElements,
      totalPages: paginatedTableResponse.totalPages,
    }
  }

  private mapResponseToTable(tableResponse: DiningTableResponse): DiningTable {
    return {
      id: tableResponse.id,
      name: tableResponse.name,
      createdAt: new Date(tableResponse.createdAt),
      updatedAt: tableResponse.updatedAt ? new Date(tableResponse.updatedAt) : null,
    }
  }
}
