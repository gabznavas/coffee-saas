import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { TableFormComponent } from './table-form/table-form.component';
import { TableListComponent } from './table-list/table-list.component';

@NgModule({
  declarations: [
    TableComponent,
    TableFormComponent,
    TableListComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class TableModule { }
