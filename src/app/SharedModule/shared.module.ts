import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { AddAdminComponent } from './pages/add-admin/add-admin.component';
import { ListAdminComponent } from './pages/list-admin/list-admin.component';
import { ListIpsComponent } from './pages/list-ips/list-ips.component';
import { AddIpsComponent } from './pages/add-ips/add-ips.component';
import { AddOperadoresComponent } from './pages/add-operdores/add-operdores.component';
import { AddSuperAdminComponent } from './pages/add-super-admin/add-super-admin.component';
import { ListOperadoresComponent } from './pages/list-operadores/list-operadores.component';
import { ListSuperAdminComponent } from './pages/list-super-admin/list-super-admin.component';







@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    ModalMensajeComponent,
    ModalAlimentacionComponent,
    ModalEjercicioComponent,
    ModalCrecimientoComponent,
    DashboardComponent,
    AddAdminComponent,
    ListAdminComponent,
    ListIpsComponent,
    AddIpsComponent,
    AddOperadoresComponent,
    AddSuperAdminComponent,
    ListOperadoresComponent,
    ListSuperAdminComponent
  ],
  imports: [
    CommonModule,
    SharedModuleRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    MenuComponent 
  ]
})
export class SharedModule { }
