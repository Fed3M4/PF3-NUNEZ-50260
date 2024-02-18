import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnosComponent } from './alumnos.component';
import {MatTableModule} from '@angular/material/table';
import { SharedModule } from '../../../../shared/shared.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AltaAlumnosModule } from './components/alta-alumnos/alta-alumnos.module';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { RouterModule } from '@angular/router';
import { AlumnosRoutingModule } from './alumnos-routing.module';

@NgModule({
  declarations: [
    AlumnosComponent,
    UserDetailComponent
    ],
  imports: [
    CommonModule,
    MatTableModule,
    SharedModule,
    MatFormFieldModule,
    AltaAlumnosModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    AlumnosRoutingModule
  ],
  exports: [
    AlumnosComponent,
    UserDetailComponent
  ],
  providers: []
})
export class AlumnosModule { }
