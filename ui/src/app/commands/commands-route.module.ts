import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandsComponent } from './commands.component';
import { CommandFormComponent } from './command-form/command-form.component';
import { CommandListComponent } from './command-list/command-list.component';
import { ProductsFromCommandComponent } from './products-from-command/products-from-command.component';
import { SelectProductComponent } from './select-product/select-product.component';


const routes: Routes = [
  {
    path: '',
    component: CommandsComponent,
    children: [
      { path: 'list', component: CommandListComponent },
      { path: 'form', component: CommandFormComponent },
      { path: ':commandId/products', component: ProductsFromCommandComponent },
      { path: ':commandId/select-product', component: SelectProductComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }