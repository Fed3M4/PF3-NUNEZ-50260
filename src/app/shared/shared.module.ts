import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './full-name.pipe';
import { ColorearUltimoAgregadoDirective } from './colorear-ultimo-agregado.directive';
import { TitulosTamanioDirective } from './titulos-tamanio.directive';
import { ValidationErrorsPipe } from './validationErrors.pipe';



@NgModule({
  declarations: [
    FullNamePipe,
    ColorearUltimoAgregadoDirective,
    TitulosTamanioDirective,
    ValidationErrorsPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FullNamePipe,
    ColorearUltimoAgregadoDirective,
    TitulosTamanioDirective,
    ValidationErrorsPipe
  ]
})
export class SharedModule { }
