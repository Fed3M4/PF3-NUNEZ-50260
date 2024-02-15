import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../../shared/shared.module';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AlumnosService } from '../../core/services/alumnos.service';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    SharedModule,
    MatListModule,
    MatProgressSpinnerModule,
    DashboardRoutingModule
  ],
  exports: [DashboardComponent],
  providers: [
    AlumnosService
  ]
})
export class DashboardModule {}
