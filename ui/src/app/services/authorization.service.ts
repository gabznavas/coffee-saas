import { Injectable } from '@angular/core';
import { Token } from '../types/token.type';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor() { }

  setTokenLocalStorage(token: Token): void {
    localStorage.setItem("token", JSON.stringify(token))
  }
}
