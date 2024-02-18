import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos.component';
import {MatCardModule} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { CursosRoutingModule } from './cursos-routing.module';
import { CursosSubscribeFormComponent } from './pages/cursos-subscribe-form/cursos-subscribe-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../../../shared/shared.module';



@NgModule({
  declarations: [
    CursosComponent,
    CursosSubscribeFormComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButton,
    CursosRoutingModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    SharedModule
  ],
  exports: [
    CursosComponent,
    CursosSubscribeFormComponent
  ]
})
export class CursosModule { }
