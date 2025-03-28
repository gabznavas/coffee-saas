import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table.component';
import { TableListComponent } from './table-list/table-list.component';
import { TableFormComponent } from './table-form/table-form.component';


const routes: Routes = [
  {
    path: '',
    component: TableComponent,
    children: [
      { path: '', component: TableListComponent },
      { path: 'form', component: TableFormComponent },
      { path: 'form/:tableId', component: TableFormComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableRoutingModule { }