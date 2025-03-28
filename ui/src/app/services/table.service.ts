import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PaginatedResponse } from '../types/paginated-response.type';
import { Table } from '../types/table.type';
import { environment } from '../../environments/environment';
import { AuthorizationService } from './authorization.service';
import { HttpClient } from '@angular/common/http';
import { TableResponse } from './types.ts/table-response.type';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(
    private client: HttpClient,
    private authorizationService: AuthorizationService
  ) { }

  findAllTables(query: string = '', page = 0, size = 5, sortBy = 'name', orderBy = 'asc'): Observable<PaginatedResponse<Table>> {
    const url = `${environment.apiUrl}/v1/table?page=${page}&size=${size}&sort=${sortBy},${orderBy}&query=${query}`
    const headers = {
      Authorization: `Bearer ${this.authorizationService.getTokenLocalStorage()}`
    }

    return this.client.get<PaginatedResponse<TableResponse>>(url, { headers })
      .pipe(
        map(paginatedTableResponse => this.mapPaginatedResponseToTable(paginatedTableResponse)),
      )
  }

  mapPaginatedResponseToTable(paginatedTableResponse: PaginatedResponse<TableResponse>): PaginatedResponse<Table> {
    return {
      content: paginatedTableResponse.content.map(item => this.mapResponseToTable(item)),
      page: paginatedTableResponse.page,
      size: paginatedTableResponse.size,
      totalElements: paginatedTableResponse.totalElements,
      totalPages: paginatedTableResponse.totalPages,
    }
  }
  mapResponseToTable(tableResponse: TableResponse): Table {
    return {
      id: tableResponse.id,
      name: tableResponse.name,
      createdAt: new Date(tableResponse.createdAt),
      updatedAt: tableResponse.updatedAt ? new Date(tableResponse.updatedAt) : null,
    }
  }
}
