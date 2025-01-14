import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GestantesRoutingModule } from './gestantes-routing.module';
import { RouterModule } from '@angular/router';
import { NotasComponent } from './pages/notas/notas.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedHeaderModuleModule } from '../shared/shared-header-module/shared-header-module.module';
import { ModalComponent } from './pages/modal/modal.component';
import { ExamenesComponent } from './pages/examenes/examenes.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ModalAlertaComponent } from './pages/modal-alerta/modal-alerta.component';



@NgModule({
  declarations: [
    NotasComponent,
    DashboardComponent,
    ModalComponent,
    ExamenesComponent,
    ModalAlertaComponent,
  ],
  imports: [
    CommonModule,
    GestantesRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    FullCalendarModule,
    SharedHeaderModuleModule

  ]
})
export class GestantesModule { }
