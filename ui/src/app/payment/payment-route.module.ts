import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { PaymentComponent } from './payment.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';


const routes: Routes = [
  {
    path: '',
    component: PaymentComponent,
    children: [
      { path: 'list', component: PaymentListComponent },
      { path: 'command/:commandId/payment/form', component: PaymentFormComponent },
      { path: 'command/:commandId/payment/:paymentId/form', component: PaymentFormComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }