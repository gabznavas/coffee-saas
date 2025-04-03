import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandFormComponent } from './command-form/command-form.component';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';
import { CommandsComponent } from './commands.component';
import { UserRoutingModule } from './commands-route.module';
import { CommandListComponent } from './command-list/command-list.component';
import { AddProductToCommandComponent } from './add-product-to-command/add-product-to-command.component';


@NgModule({
  declarations: [
    CommandsComponent,
    CommandFormComponent,
    CommandListComponent,
    AddProductToCommandComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ComponentsModule,
  ],

})
export class CommandsModule { }
