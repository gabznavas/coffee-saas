import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiningTableListComponent } from './dining-table-list/dining-table-list.component';
import { DiningTableFormComponent } from './dining-table-form/dining-table-form.component';
import { DiningTableComponent } from './dining-table.component';


const routes: Routes = [
  {
    path: '',
    component: DiningTableComponent,
    children: [
      { path: '', component: DiningTableListComponent },
      { path: 'form', component: DiningTableFormComponent },
      { path: 'form/:diningTableId', component: DiningTableFormComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiningTableRoutingModule { }