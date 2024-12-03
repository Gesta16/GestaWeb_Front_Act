import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GestantesRoutingModule } from './gestantes-routing.module';
import { RouterModule } from '@angular/router';
import { NotasComponent } from './pages/notas/notas.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedHeaderModuleModule } from '../shared/shared-header-module/shared-header-module.module';
import { ModalComponent } from './pages/modal/modal.component';



@NgModule({
  declarations: [
    NotasComponent,
    DashboardComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    GestantesRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedHeaderModuleModule

  ]
})
export class GestantesModule { }
