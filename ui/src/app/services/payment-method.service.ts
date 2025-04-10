import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { PaymentMethod } from '../types/payment-method.type';
import { AuthorizationService } from './authorization.service';
import { PaymentMethodResponse } from './types.ts/payment-method-response.type';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  constructor(
    private client: HttpClient,
    private authorizationService: AuthorizationService,
  ) { }

  findAllPaymentMethods(): Observable<PaymentMethod[]> {
    const url = `${environment.apiUrl}/v1/payment-method`
    const headers = {
      Authorization: `Bearer ${this.authorizationService.getTokenLocalStorage()}`
    }
    return this.client.get<PaymentMethodResponse[]>(url, { headers })
      .pipe(map(this.mapResponseListToPaymentMethodList))
  }

  private mapResponseListToPaymentMethodList(paymentMethods: PaymentMethodResponse[]): PaymentMethod[] {
    return paymentMethods.map(item => {
      return {
        id: item.id,
        name: item.name,
      }
    })
  }
}
