import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandFormComponent } from './command-form/command-form.component';
import { CommandListComponent } from './command-list/command-list.component';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CommandFormComponent,
    CommandListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
  ],
  exports: [
    CommandFormComponent,
    CommandListComponent
  ]
})
export class CommandsModule { }
