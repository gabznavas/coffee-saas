import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreatePayment } from './types.ts/create-payment.type';
import { HttpClient } from '@angular/common/http';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private client: HttpClient,
    private authorizationService: AuthorizationService
  ) { }

  createPayment(data: CreatePayment): Observable<void> {
    const url = `${environment.apiUrl}/v1/payment`
    const headers = {
      Authorization: `Bearer ${this.authorizationService.getTokenLocalStorage()}`
    }

    return this.client.post<void>(url, data, { headers })
  }

}
