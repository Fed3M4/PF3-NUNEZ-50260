import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './full-name.pipe';
import { ColorearUltimoAgregadoDirective } from './colorear-ultimo-agregado.directive';
import { TitulosTamanioDirective } from './titulos-tamanio.directive';



@NgModule({
  declarations: [
    FullNamePipe,
    ColorearUltimoAgregadoDirective,
    TitulosTamanioDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FullNamePipe,
    ColorearUltimoAgregadoDirective,
    TitulosTamanioDirective
  ]
})
export class SharedModule { }
