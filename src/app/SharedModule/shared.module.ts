import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleRoutingModule } from './shared-routing.module';
import { HomeComponent } from './pages/Home/home.component';
import { MenuComponent } from './pages/Menu/menu.component';
import { ModalMensajeComponent } from './pages/Home/Modales/modal-mensaje/modal-mensaje.component';
import { ModalAlimentacionComponent } from './pages/Home/Modales/modal-alimentacion/modal-alimentacion.component';
import { ModalEjercicioComponent } from './pages/Home/Modales/modal-ejercicio/modal-ejercicio.component';
import { ModalCrecimientoComponent } from './pages/Home/Modales/modal-crecimiento/modal-crecimiento.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/Dashboard/dashboard.component';







@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    ModalMensajeComponent,
    ModalAlimentacionComponent,
    ModalEjercicioComponent,
    ModalCrecimientoComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModuleRoutingModule,
    RouterModule
  ],
  exports: [
    MenuComponent 
  ]
})
export class SharedModule { }
