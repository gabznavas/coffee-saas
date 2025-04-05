import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { FormsModule } from '@angular/forms';
import { PaymentRoutingModule } from './payment-route.module';

@NgModule({
  declarations: [
    PaymentComponent,
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    FormsModule,
  ]
})
export class PaymentModule { }
