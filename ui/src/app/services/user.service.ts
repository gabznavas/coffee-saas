import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { User } from '../types/user.type';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userKey = "user";

  constructor(
    private client: HttpClient,
    private authorizationService: AuthorizationService
  ) { }

  getUserLogged(): Observable<User> {
    const url = `http://localhost:8080/api/v1/user/logged`
    const headers = {
      Authorization: `Bearer ${this.authorizationService.getTokenLocalStorage()}`
    }
    return this.client.get<User>(url, { headers })
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

}
