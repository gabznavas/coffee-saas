import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandsComponent } from './commands.component';
import { CommandFormComponent } from './command-form/command-form.component';
import { CommandListComponent } from './command-list/command-list.component';


const routes: Routes = [
  {
    path: '',
    component: CommandsComponent,
    children: [
      { path: 'list', component: CommandListComponent },
      { path: 'form', component: CommandFormComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }