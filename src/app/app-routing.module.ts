import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './layouts/not-found/not-found.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';

const routes: Routes = [
  {
    path:'', redirectTo: 'dashboard/home', pathMatch: 'full'
  },
  {
    path: 'dashboard', component: DashboardComponent,
    loadChildren: () => import('./layouts/dashboard/dashboard.module').then((m)=> m.DashboardModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./layouts/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: '404', component: NotFoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
