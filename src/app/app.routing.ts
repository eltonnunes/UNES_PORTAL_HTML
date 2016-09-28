import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', loadChildren: 'app/modules/login/login.module#LoginModule' },
  { path: 'home', loadChildren: 'app/modules/home/home.module#HomeModule' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
