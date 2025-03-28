import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authenticatedGuard } from './guards/authenticated.guard';

const routes: Routes = [{
  path: 'login',
  loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
}, {
  path: 'home',
  canActivate: [authenticatedGuard],
  loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
}, {
  path: 'settings',
  canActivate: [authenticatedGuard],
  loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
}, {
  path: 'stock',
  canActivate: [authenticatedGuard],
  loadChildren: () => import('./stock/stock.module').then(m => m.StockModule)
}, {
  path: 'user',
  canActivate: [authenticatedGuard],
  loadChildren: () => import('./user/user.module').then(m => m.UserModule)
}, {
  path: 'dining-table',
  canActivate: [authenticatedGuard],
  loadChildren: () => import('./dining-table/dining-table.module').then(m => m.DiningTableModule)
}, {
  path: '',
  redirectTo: 'home',
  pathMatch: 'full',
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
