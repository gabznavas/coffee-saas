import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PaginatedResponse } from '../types/paginated-response.type';
import { CommandItem } from '../types/command-item.type';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthorizationService } from './authorization.service';
import { CommandItemResponse } from './types.ts/command-item-response.type';

@Injectable({
  providedIn: 'root'
})
export class CommandItemService {


  constructor(
    private authorizationService: AuthorizationService,
    private client: HttpClient,
  ) { }

  findCommandItemsByCommand(commandId: number): Observable<PaginatedResponse<CommandItem>> {
    const url = `${environment.apiUrl}/v1/command/${commandId}/item`
    const headers = {
      Authorization: `Bearer ${this.authorizationService.getTokenLocalStorage()}`
    }

    return this.client.get<PaginatedResponse<CommandItemResponse>>(url, { headers })
      .pipe(map(paginatedResponseCommandResponse => this.mapResponseToPaginetedCommandItems(paginatedResponseCommandResponse)))
  }

  private mapResponseToPaginetedCommandItems(paginatedResponseCommandResponse: PaginatedResponse<CommandItemResponse>): PaginatedResponse<CommandItem> {
    return {
      content: paginatedResponseCommandResponse.content.map(this.mapResponseToCommandItem),
      page: paginatedResponseCommandResponse.page,
      size: paginatedResponseCommandResponse.size,
      totalElements: paginatedResponseCommandResponse.totalElements,
      totalPages: paginatedResponseCommandResponse.totalPages,
    }
  }

  private mapResponseToCommandItem(commandItemResponse: CommandItemResponse): CommandItem {
    return {
      id: commandItemResponse.id,
      quantity: commandItemResponse.quantity,
      commandId: commandItemResponse.commandId,
      canceledIn: commandItemResponse.canceledIn ? new Date(commandItemResponse.canceledIn) : null,
      observations: commandItemResponse.observations,
      price: commandItemResponse.price,
      product: {
        id: commandItemResponse.product.id,
        name: commandItemResponse.product.name,
        price: commandItemResponse.product.price,
      }
    }
  }
}
