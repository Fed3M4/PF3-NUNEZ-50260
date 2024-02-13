import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AlumnosModule } from './pages/alumnos/alumnos.module';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { NosotrosModule } from './pages/nosotros/nosotros.module';
import { HomeModule } from './pages/home/home.module';
import { ProfesoresModule } from './pages/profesores/profesores.module';
import { LoginModule } from '../auth/login/login.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CursosModule } from './pages/cursos/cursos.module';
import { HomeComponent } from './pages/home/home.component';
import { AlumnosComponent } from './pages/alumnos/alumnos.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ProfesoresComponent } from './pages/profesores/profesores.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { LoginComponent } from '../auth/login/login.component';
import { UserDetailComponent } from './pages/alumnos/pages/user-detail/user-detail.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    AlumnosModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'alumnos',
        component: AlumnosComponent,
        // children: [
        //   {
        //     path: ':id',
        //     component: UserDetailComponent
        //   }
        // ]
      },
      {
        path: 'alumnos/:id',
        component: UserDetailComponent
      },
      {
        path: 'nosotros',
        component: NosotrosComponent,
      },
      {
        path: 'profesores',
        component: ProfesoresComponent,
      },
      {
        path: 'cursos',
        component: CursosComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'logout',
        redirectTo: 'dashboard/login',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: '/404',
      },
    ]),
    MatListModule,
    NosotrosModule,
    HomeModule,
    ProfesoresModule,
    LoginModule,
    MatProgressSpinnerModule,
    CursosModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
