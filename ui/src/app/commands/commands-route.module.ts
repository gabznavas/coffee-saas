import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandsComponent } from './commands.component';
import { CommandOpenedListComponent } from './command-opened-list/command-opened-list.component';
import { CommandFormComponent } from './command-form/command-form.component';


const routes: Routes = [
  {
    path: '',
    component: CommandsComponent,
    children: [
      { path: 'opened-list', component: CommandOpenedListComponent },
      { path: 'form', component: CommandFormComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }