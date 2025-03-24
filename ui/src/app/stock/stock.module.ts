import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockFormComponent } from './stock-form/stock-form.component';
import { StockRoutingModule } from './stock-route.module';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockComponent } from './stock.component';
import { ComponentsModule } from "../components/components.module";
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    StockComponent,
    StockListComponent,
    StockFormComponent,
  ],
  imports: [
    CommonModule,
    StockRoutingModule,
    FormsModule,
    ComponentsModule
  ]
})
export class StockModule { }
