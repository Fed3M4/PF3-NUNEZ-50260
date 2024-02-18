import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layouts/auth/login/login.component';
import { NotFoundComponent } from './layouts/not-found/not-found.component';
import { DashboardRoutingModule } from './layouts/dashboard/dashboard-routing-module';
import { AlumnosRoutingModule } from './layouts/dashboard/pages/alumnos/alumnos-routing.module';


const routes: Routes = [
  {
    path:'', redirectTo: 'dashboard/home', pathMatch: 'full'
  },
  {
    path: 'dashboard', loadChildren: () => import('./layouts/dashboard/dashboard.module').then((m)=> m.DashboardModule)
  },
  {
    path: 'auth', loadChildren: () => import('./layouts/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: '404', component: NotFoundComponent
  },
  {
    path: '**', redirectTo: '404'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes), DashboardRoutingModule, AlumnosRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
