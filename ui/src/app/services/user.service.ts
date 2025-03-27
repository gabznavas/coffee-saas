import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { User } from '../types/user.type';
import { AuthorizationService } from './authorization.service';
import { Profile } from '../types/profile.type';
import { Security } from '../types/security.type';
import { Role, RoleName } from '../types/user-role.type';
import { UserResponse } from './types.ts/user-response.type';

import { environment } from '../../environments/environment';
import { PaginatedResponse } from '../types/paginated-response.type';
import { CreateUserRequest } from './types.ts/create-user-request.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userKey = "user";

  private dataSubject = new BehaviorSubject<User>({} as User);

  constructor(
    private client: HttpClient,
    private authorizationService: AuthorizationService,
  ) { }

  observableUser(): Observable<User> {
    return this.dataSubject.asObservable();
  }

  getUserLogged(): Observable<User> {
    const url = `${environment.apiUrl}/v1/user/logged`
    const headers = {
      Authorization: `Bearer ${this.authorizationService.getTokenLocalStorage()}`
    }

    return this.client.get<UserResponse>(url, { headers })
      .pipe(
        map(userResponse => {
          const user = this.mapResponseToUser(userResponse)
          this.setUserLocalStorage(user)
          this.dataSubject.next(user);
          return user;
        }),
      )
  }

  registerUser(createUser: CreateUserRequest): Observable<User> {
    const url = `${environment.apiUrl}/v1/user`
    const headers = {
      Authorization: `Bearer ${this.authorizationService.getTokenLocalStorage()}`
    }

    return this.client.post<UserResponse>(url, createUser, { headers })
      .pipe(
        map(userResponse => this.mapResponseToUser(userResponse)),
      )
  }

  updateUser(createUser: CreateUserRequest): Observable<void> {
    const url = `${environment.apiUrl}/v1/user`
    const headers = {
      Authorization: `Bearer ${this.authorizationService.getTokenLocalStorage()}`
    }

    return this.client.patch<void>(url, createUser, { headers })

  }

  findAllUsers(query: string = '', page = 0, size = 5, sortBy = 'fullName,email', orderBy = 'asc'): Observable<PaginatedResponse<User>> {
    const url = `${environment.apiUrl}/v1/user?page=${page}&size=${size}&sort=${sortBy},${orderBy}&query=${query}`
    const headers = {
      Authorization: `Bearer ${this.authorizationService.getTokenLocalStorage()}`
    }

    return this.client.get<PaginatedResponse<UserResponse>>(url, { headers })
      .pipe(
        map(paginatedUserResponse => this.mapPaginatedResponseToUser(paginatedUserResponse)),
      )
  }

  setUserLocalStorage(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user))
  }

  getUserLocalStorage(): Observable<User> {
    const userJson = localStorage.getItem(this.userKey);

    if (userJson) {
      return of(JSON.parse(userJson));
    } else {
      return this.getUserLogged()
        .pipe(
          tap(user => this.setUserLocalStorage(user))
        );
    }
  }

  isAuthenticated(): boolean {
    const userJson = localStorage.getItem(this.userKey);
    return userJson !== null
  }

  updateProfile(profile: Profile): Observable<void> {
    const url = `${environment.apiUrl}/v1/user/profile`
    const headers = {
      Authorization: `Bearer ${this.authorizationService.getTokenLocalStorage()}`
    }
    return this.client.patch<void>(url, profile, { headers })
  }


  updateSecurity(security: Security): Observable<void> {
    const url = `${environment.apiUrl}/v1/user/security`
    const headers = {
      Authorization: `Bearer ${this.authorizationService.getTokenLocalStorage()}`
    }
    return this.client.patch<void>(url, security, { headers })
  }

  logout() {
    localStorage.clear()
  }

  private mapResponseToUser(data: UserResponse): User {
    return new User(
      data.id,
      data.fullName,
      data.email,
      data.profileImageUrl,
      new Date(data.createdAt),
      data.updatedAt ? new Date(data.updatedAt) : null,
      data.disabledAt ? new Date(data.disabledAt) : null,
      data.roles.map(role => new Role(
        role.id,
        role.name as RoleName
      )),
    )
  }

  private mapPaginatedResponseToUser(paginatedUserResponse: PaginatedResponse<UserResponse>): PaginatedResponse<User> {
    return {
      content: paginatedUserResponse.content.map(this.mapResponseToUser),
      page: paginatedUserResponse.page,
      size: paginatedUserResponse.size,
      totalElements: paginatedUserResponse.totalElements,
      totalPages: paginatedUserResponse.totalPages,
    }
  }
}
