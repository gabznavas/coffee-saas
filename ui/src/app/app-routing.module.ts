import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'login',
  loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
}, {
  path: 'home',
  loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
}, {
  path: 'settings',
  loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
}, {
  path: 'stock',
  loadChildren: () => import('./stock/stock.module').then(m => m.StockModule)
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
