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
import { AddAdminComponent } from './pages/add-admin/add-admin.component';
import { ListAdminComponent } from './pages/list-admin/list-admin.component';
import { ListIpsComponent } from './pages/list-ips/list-ips.component';
import { AddIpsComponent } from './pages/add-ips/add-ips.component';
import { AddOperadoresComponent } from './pages/add-operdores/add-operdores.component';
import { AddSuperAdminComponent } from './pages/add-super-admin/add-super-admin.component';
import { ListOperadoresComponent } from './pages/list-operadores/list-operadores.component';
import { ListSuperAdminComponent } from './pages/list-super-admin/list-super-admin.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { ListGestantesComponent } from './pages/list-gestantes/list-gestantes.component';
import { RutaGestanteComponent } from './pages/ruta-gestante/ruta-gestante.component';
import { AddGestanteComponent } from './pages/add-gestante/add-gestante.component';
import { Ruta2Component } from './pages/formulario/ruta-2/ruta-2.component';
import { Ruta3Component } from './pages/formulario/ruta-3/ruta-3.component';
import { Ruta4Component } from './pages/formulario/ruta-4/ruta-4.component';
import { Ruta5Component } from './pages/formulario/ruta-5/ruta-5.component';
import { Ruta6Component } from './pages/formulario/ruta-6/ruta-6.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SharedHeaderModuleModule } from '../shared/shared-header-module/shared-header-module.module';
import { ImportExcelComponent } from './pages/import-excel/import-excel.component';






@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    ModalMensajeComponent,
    ModalAlimentacionComponent,
    ModalEjercicioComponent,
    ModalCrecimientoComponent,
    AddAdminComponent,
    ListAdminComponent,
    ListIpsComponent,
    AddIpsComponent,
    AddOperadoresComponent,
    AddSuperAdminComponent,
    ListOperadoresComponent,
    ListSuperAdminComponent,
    PerfilComponent,
    ReporteComponent,
    ListGestantesComponent,
    RutaGestanteComponent,
    AddGestanteComponent,
    Ruta2Component,
    Ruta3Component,
    Ruta4Component,
    Ruta5Component,
    Ruta6Component,
    DashboardComponent,
    ImportExcelComponent,
  ],
  imports: [
    CommonModule,
    SharedModuleRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    FullCalendarModule,
    SharedHeaderModuleModule
  ],
  exports: [
    MenuComponent 
  ]
})
export class SharedModule { }
