import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { User } from '../types/user.type';
import { AuthorizationService } from './authorization.service';
import { Profile } from '../types/profile.type';
import { Security } from '../types/security.type';
import { Router } from '@angular/router';
import { UserRole, UserRoleName } from '../types/user-role.type';
import { UserResponse } from './types.ts/user-response.type';

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
    const url = `http://localhost:8080/api/v1/user/logged`
    const headers = {
      Authorization: `Bearer ${this.authorizationService.getTokenLocalStorage()}`
    }

    return this.client.get<UserResponse>(url, { headers })
      .pipe(
        map(userResponse => {
          const user = new User()
          user.id = userResponse.id
          user.fullName = userResponse.fullName
          user.email = userResponse.email
          user.profileImageUrl = userResponse.profileImageUrl
          user.roles = userResponse.roles.map(userRoleName => new UserRole(userRoleName as UserRoleName))

          this.setUserLocalStorage(user)
          this.dataSubject.next(user);
          return user;
        }),
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
    const url = `http://localhost:8080/api/v1/user/profile`
    const headers = {
      Authorization: `Bearer ${this.authorizationService.getTokenLocalStorage()}`
    }
    return this.client.patch<void>(url, profile, { headers })
  }


  updateSecurity(security: Security): Observable<void> {
    const url = `http://localhost:8080/api/v1/user/security`
    const headers = {
      Authorization: `Bearer ${this.authorizationService.getTokenLocalStorage()}`
    }
    return this.client.patch<void>(url, security, { headers })
  }

  getRankUserRoles(roles: string[]) {

  }

  logout() {
    localStorage.clear()
  }
}
