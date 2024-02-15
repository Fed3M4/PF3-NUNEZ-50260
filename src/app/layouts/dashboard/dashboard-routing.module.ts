import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { AlumnosComponent } from "./pages/alumnos/alumnos.component";
import { NosotrosComponent } from "./pages/nosotros/nosotros.component";
import { ProfesoresComponent } from "./pages/profesores/profesores.component";
import { CursosComponent } from "./pages/cursos/cursos.component";
import { LoginComponent } from "../auth/login/login.component";

const routes: Routes = [
    // {
    //     path: '',
    //     component: DashboardComponent
    // }
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'alumnos', component: AlumnosComponent,
    loadChildren: () => import('./pages/alumnos/alumnos.module').then((m)=> m.AlumnosModule),
    pathMatch: 'full'
    // children: [
    //   {
    //     path: ':id',
    //     component: UserDetailComponent
    //   }
    // ]
  },
//   {
//     path: 'alumnos/:id',
//     component: UserDetailComponent
//   },
  {
    path: 'nosotros',
    component: NosotrosComponent,
  },
  {
    path: 'profesores', component: ProfesoresComponent,
    loadChildren: () => import('./pages/profesores/profesores.module').then((m) => m.ProfesoresModule)
  },
  {
    path: 'cursos', component: CursosComponent,
    loadChildren: () => import('./pages/cursos/cursos.module').then((m) => m.CursosModule)
  },
  {
    path: 'login',
    component: LoginComponent,
  },
//   {
//     path: 'logout',
//     redirectTo: 'dashboard/login',
//     pathMatch: 'full'
//   },
  {
    path: '**',
    redirectTo: '/404',
  },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class DashboardRoutingModule {}