import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockFormComponent } from './stock-form/stock-form.component';
import { StockRoutingModule } from './stock-route.module';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockComponent } from './stock.component';



@NgModule({
  declarations: [
    StockComponent,
    StockListComponent,
    StockFormComponent,
  ],
  imports: [
    CommonModule,
    StockRoutingModule
  ]
})
export class StockModule { }
