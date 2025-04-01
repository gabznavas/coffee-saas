import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandFormComponent } from './command-form/command-form.component';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';
import { CommandsComponent } from './commands.component';
import { CommandOpenedListComponent } from './command-opened-list/command-opened-list.component';
import { UserRoutingModule } from './commands-route.module';


@NgModule({
  declarations: [
    CommandsComponent,
    CommandFormComponent,
    CommandOpenedListComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ComponentsModule,
  ],

})
export class CommandsModule { }
