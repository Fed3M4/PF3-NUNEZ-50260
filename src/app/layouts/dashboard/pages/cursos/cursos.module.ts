import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos.component';
import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [
    CursosComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [
    CursosComponent
  ]
})
export class CursosModule { }
