import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Unit } from '../types/unit.type';
import { UnitResponse } from './types.ts/unit-response.type';
import { AuthorizationService } from './authorization.service';

import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(
    private client: HttpClient,
    private authorizationService: AuthorizationService,
  ) { }

  findAll(): Observable<Unit[]> {
    const url = `${environment.apiUrl}/v1/unit`
    const headers = {
      Authorization: `Bearer ${this.authorizationService.getTokenLocalStorage()}`
    }
    return this.client.get<UnitResponse[]>(url, { headers })
  }
}
