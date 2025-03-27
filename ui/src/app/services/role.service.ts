import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Role, RoleName } from '../types/user-role.type';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthorizationService } from './authorization.service';
import { RoleResponse } from './types.ts/role-response.type';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private client: HttpClient,
    private authorizationService: AuthorizationService
  ) { }

  findRoles(): Observable<Role[]> {
    const url = `${environment.apiUrl}/v1/role`
    const headers = {
      Authorization: `Bearer ${this.authorizationService.getTokenLocalStorage()}`
    }
    return this.client.get<RoleResponse[]>(url, { headers })
      .pipe(
        map(rolesResponse => {
          const roles: Role[] = rolesResponse.map(roleResponse => new Role(
            roleResponse.id,
            roleResponse.name as RoleName
          ));
          return roles;
        })
      )
  }
}
