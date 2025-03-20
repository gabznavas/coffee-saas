import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandListComponent } from '../commands/command-list/command-list.component';
import { CommandFormComponent } from '../commands/command-form/command-form.component';
import { OptionsComponent } from './options/options.component';
import { HomeComponent } from './home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: OptionsComponent },
      { path: 'command-list', component: CommandListComponent },
      { path: 'command-form', component: CommandFormComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }