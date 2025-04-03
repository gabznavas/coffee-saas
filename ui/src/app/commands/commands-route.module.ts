import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandsComponent } from './commands.component';
import { CommandFormComponent } from './command-form/command-form.component';
import { CommandListComponent } from './command-list/command-list.component';
import { AddProductToCommandComponent } from './add-product-to-command/add-product-to-command.component';


const routes: Routes = [
  {
    path: '',
    component: CommandsComponent,
    children: [
      { path: 'list', component: CommandListComponent },
      { path: 'form', component: CommandFormComponent },
      { path: ':commandId/products', component: AddProductToCommandComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }