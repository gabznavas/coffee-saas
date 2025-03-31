import { Injectable } from '@angular/core';
import { CreateCommandRequest } from './types.ts/create-command-request.type';
import { Command } from '../types/command.type';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthorizationService } from './authorization.service';
import { CommandResponse } from './types.ts/command-response.type';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  constructor(
    private client: HttpClient,
    private authorizationService: AuthorizationService
  ) { }

  createCommand(data: CreateCommandRequest): Observable<Command> {
    const url = `${environment.apiUrl}/v1/command`
    const headers = {
      Authorization: `Bearer ${this.authorizationService.getTokenLocalStorage()}`
    }

    return this.client.post<CommandResponse>(url, data, { headers })
      .pipe(map(commandResponse => this.mapResponseToCommand(commandResponse)))
  }

  private mapResponseToCommand = (commandResponse: CommandResponse): Command => {
    return {
      id: commandResponse.id,

      clientName: commandResponse.clientName,
      diningTableId: commandResponse.diningTableId,
      attendentId: commandResponse.attendentId,

      openedAt: new Date(commandResponse.openedAt),
      canceledIn: commandResponse.canceledIn ? new Date(commandResponse.canceledIn) : null,
      closedAt: commandResponse.closedAt ? new Date(commandResponse.closedAt) : null,
    }
  }
}
