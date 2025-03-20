import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandFormComponent } from './command-form/command-form.component';
import { CommandListComponent } from './command-list/command-list.component';


@NgModule({
  declarations: [
    CommandFormComponent,
    CommandListComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CommandFormComponent,
    CommandListComponent
  ]
})
export class CommandsModule { }
