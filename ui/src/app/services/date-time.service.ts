import { Injectable } from '@angular/core';
import { formatInTimeZone } from 'date-fns-tz';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor() { }

  addLocalTimeZone(dateStr: string, dateWithTimezone = "yyyy-MM-dd'T'HH:mmXXX"): string {
    // Pegando o fuso horário do usuário. Ex: -03:00...
    const timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Data recebida (exemplo)
    const date = new Date(dateStr);

    // Convertendo a data para o fuso horário correto
    return formatInTimeZone(date, timeZone, dateWithTimezone);
  }
}
