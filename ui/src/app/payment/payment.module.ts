import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { FormsModule } from '@angular/forms';
import { PaymentRoutingModule } from './payment-route.module';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    PaymentComponent,
    PaymentFormComponent,
    PaymentListComponent,
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    FormsModule,
    ComponentsModule
  ]
})
export class PaymentModule { }
