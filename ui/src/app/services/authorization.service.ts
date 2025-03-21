import { Injectable } from '@angular/core';
import { Token } from '../types/token.type';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private tokenKey = "token"

  constructor() { }

  setTokenLocalStorage(token: Token): void {
    localStorage.setItem(this.tokenKey, JSON.stringify(token))
  }

  getTokenLocalStorage(): string {
    const tokenJson: string | null = localStorage.getItem(this.tokenKey)
    if (!tokenJson) {
      return "token_is_undefined"
    }
    const { token }: Token = JSON.parse(tokenJson)
    return token
  }
}
