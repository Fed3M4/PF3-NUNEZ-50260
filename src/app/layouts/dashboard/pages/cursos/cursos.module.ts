import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos.component';
import {MatCardModule} from '@angular/material/card';
import { CursosRoutingModule } from './cursos-routing.module';



@NgModule({
  declarations: [
    CursosComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    CursosRoutingModule
  ],
  exports: [
    CursosComponent
  ]
})
export class CursosModule { }
