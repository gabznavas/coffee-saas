import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';


const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', component: UserListComponent },
      { path: 'form', component: UserFormComponent },
      { path: 'form/:userId', component: UserFormComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }