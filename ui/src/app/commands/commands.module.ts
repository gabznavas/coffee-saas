import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandFormComponent } from './command-form/command-form.component';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';
import { CommandsComponent } from './commands.component';
import { CommandsRoutingModule } from './commands-route.module';
import { CommandListComponent } from './command-list/command-list.component';
import { ProductsFromCommandComponent } from './products-from-command/products-from-command.component';
import { SelectProductComponent } from './select-product/select-product.component';


@NgModule({
  declarations: [
    CommandsComponent,
    CommandFormComponent,
    CommandListComponent,
    ProductsFromCommandComponent,
    SelectProductComponent,
  ],
  imports: [
    CommonModule,
    CommandsRoutingModule,
    FormsModule,
    ComponentsModule,
  ],

})
export class CommandsModule { }
