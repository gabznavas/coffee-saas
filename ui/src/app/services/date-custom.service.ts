import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateCustomService {

  constructor() { }

  getUTCDateString(): string {
    const now = new Date()

    // padStart(2, '0'): Garante que os números sempre tenham dois dígitos.
    // Obtém os componentes ajustados para UTC
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0'); // Mês começa do 0
    const day = String(now.getUTCDate()).padStart(2, '0');
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

    // Formata no padrão ISO 8601
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
  }

  // Formata no padrão ISO 8601
  removeMilliseconds(date: string) {
    return date.substring(0, 16)
  }
}
