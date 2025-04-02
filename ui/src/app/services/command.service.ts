import { Injectable } from '@angular/core';
import { CreateCommandRequest } from './types.ts/create-command-request.type';
import { Command } from '../types/command.type';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthorizationService } from './authorization.service';
import { CommandResponse } from './types.ts/command-response.type';
import { PaginatedResponse } from '../types/paginated-response.type';
import { FindAllCommandsFilters } from './types.ts/find-all-commands-filters.type';
import { DateTimeService } from './date-time.service';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  constructor(
    private client: HttpClient,
    private authorizationService: AuthorizationService,
    private dateTimeService: DateTimeService
  ) { }

  createCommand(data: CreateCommandRequest): Observable<Command> {
    const url = `${environment.apiUrl}/v1/command`
    const headers = {
      Authorization: `Bearer ${this.authorizationService.getTokenLocalStorage()}`
    }

    return this.client.post<CommandResponse>(url, data, { headers })
      .pipe(map(commandResponse => this.mapResponseToCommand(commandResponse)))
  }

  findAllCommands(filters: FindAllCommandsFilters): Observable<PaginatedResponse<Command>> {
    const minDateWithTimezone = this.dateTimeService.addLocalTimeZone(filters.minDate);
    const maxDateWithTimezone = this.dateTimeService.addLocalTimeZone(filters.maxDate);
    debugger

    const url = `${environment.apiUrl}/v1/command?page=${filters.page}&size=${filters.size}&sort=${filters.sortBy},${filters.orderBy}&state=${filters.state}&query=${filters.searchInput}&minDate=${minDateWithTimezone}&maxDate=${maxDateWithTimezone}&minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}`
    const headers = {
      Authorization: `Bearer ${this.authorizationService.getTokenLocalStorage()}`
    }

    return this.client.get<PaginatedResponse<CommandResponse>>(url, { headers })
      .pipe(map(paginatedCommandResponse => this.mapPaginatedResponse(paginatedCommandResponse)))
  }

  mapPaginatedResponse(pageItems: PaginatedResponse<CommandResponse>): PaginatedResponse<Command> {
    return {
      content: pageItems.content.map(pageItem => this.mapResponseToCommand(pageItem)),
      page: pageItems.page,
      size: pageItems.size,
      totalPages: pageItems.totalPages,
      totalElements: pageItems.totalElements,
    }
  }

  private mapResponseToCommand = (commandResponse: CommandResponse): Command => {
    return {
      id: commandResponse.id,
      clientName: commandResponse.clientName,
      priceTotal: commandResponse.priceTotal,
      diningTable: {
        id: commandResponse.diningTable.id,
        name: commandResponse.diningTable.name,
        createdAt: new Date(commandResponse.diningTable.createdAt),
        updatedAt: commandResponse.diningTable.updatedAt ? new Date(commandResponse.diningTable.updatedAt) : null,
      },
      attendentId: commandResponse.attendentId,
      openedAt: new Date(commandResponse.openedAt),
      canceledIn: commandResponse.canceledIn ? new Date(commandResponse.canceledIn) : null,
      closedAt: commandResponse.closedAt ? new Date(commandResponse.closedAt) : null,
    }
  }
}
