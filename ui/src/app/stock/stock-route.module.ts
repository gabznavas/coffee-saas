import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockFormComponent } from './stock-form/stock-form.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockComponent } from './stock.component';


const routes: Routes = [
  {
    path: '',
    component: StockComponent,
    children: [
      { path: '', component: StockListComponent },
      { path: 'form', component: StockFormComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }