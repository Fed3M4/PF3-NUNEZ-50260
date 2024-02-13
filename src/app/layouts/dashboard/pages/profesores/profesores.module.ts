import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ProfesoresComponent } from './profesores.component';
import { SharedModule } from "../../../../shared/shared.module";



@NgModule({
    declarations: [
        ProfesoresComponent
    ],
    exports: [
      ProfesoresComponent
    ],
    imports: [
        CommonModule,
        MatTableModule,
        SharedModule
    ]
})
export class ProfesoresModule { }
