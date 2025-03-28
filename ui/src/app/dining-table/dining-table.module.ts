import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiningTableComponent } from './dining-table.component';
import { DiningTableFormComponent } from './dining-table-form/dining-table-form.component';
import { DiningTableListComponent } from './dining-table-list/dining-table-list.component';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';
import { DiningTableRoutingModule } from './dining-table-route.module';



@NgModule({
  declarations: [
    DiningTableComponent,
    DiningTableFormComponent,
    DiningTableListComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    DiningTableRoutingModule,
  ]
})
export class DiningTableModule { }
