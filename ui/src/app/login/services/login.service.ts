import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../types/login.type';
import { Token } from '../../types/token.type';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private client: HttpClient,
  ) { }

  login(login: Login): Observable<Token> {
    // TODO: pegar do env a URL
    const url = `http://localhost:8080/api/v1/auth/login`
    return this.client.post<Token>(url, login)
  }
}
