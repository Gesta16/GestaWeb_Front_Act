import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/Home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RoleGuard } from '../guards/role.guard';
import { ListAdminComponent } from './pages/list-admin/list-admin.component';
import { ListIpsComponent } from './pages/list-ips/list-ips.component';
import { ListSuperAdminComponent } from './pages/list-super-admin/list-super-admin.component';
import { ListOperadoresComponent } from './pages/list-operadores/list-operadores.component';
import { ListGestantesComponent } from './pages/list-gestantes/list-gestantes.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { AddGestanteComponent } from './pages/add-gestante/add-gestante.component';
import { RutaGestanteComponent } from './pages/ruta-gestante/ruta-gestante.component';
import { Ruta2Component } from './pages/formulario/ruta-2/ruta-2.component';
import { Ruta3Component } from './pages/formulario/ruta-3/ruta-3.component';
import { Ruta4Component } from './pages/formulario/ruta-4/ruta-4.component';
import { Ruta5Component } from './pages/formulario/ruta-5/ruta-5.component';
import { Ruta6Component } from './pages/formulario/ruta-6/ruta-6.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'home', component: HomeComponent, data: { title: 'Inicio', showInMenu: false } },
      {
        path: 'dashboard', component: DashboardComponent,
        canActivate: [RoleGuard],
        data: {
          title: 'Dashboard', icon: 'fa-solid fa-chart-pie', expectedRoles: ['superadmin', 'admin','operador','usuario'], showInMenu: true
        }
      },
      {
        path:'list-superadmin', component:ListSuperAdminComponent,
        canActivate:[RoleGuard],
        data:{title:'SuperAdmin', icon:'fa-solid fa-user-tie', expectedRoles:['superadmin'], showInMenu:true}
      },
      {
        path:'list-ips', component:ListIpsComponent,
        canActivate:[RoleGuard],
        data:{title:'IPS', icon:'fa-solid fa-hospital', expectedRoles:['superadmin'], showInMenu:true}
      },
      {
        path: 'list-admin', component: ListAdminComponent, 
        canActivate:[RoleGuard],
        data: { title: 'Administradores', icon: 'fa-solid fa-users', expectedRoles: ['superadmin', 'admin'], showInMenu: true }
      },
      {
        path:'list-operadores', component:ListOperadoresComponent,
        canActivate:[RoleGuard],
        data:{title:'Operadores', icon:'fa-solid fa-stethoscope', expectedRoles:['superadmin','admin'], showInMenu:true}
      },
      {
        path:'list-gestantes', component:ListGestantesComponent,
        canActivate:[RoleGuard],
        data:{title:'Gestantes', icon:'fa-solid fa-users', expectedRoles:['superadmin','admin','operador'], showInMenu:true}
      },
      {
        path:'reportes', component:ReporteComponent,
        canActivate:[RoleGuard],
        data:{title:'Reportes', icon:'fa-solid fa-clipboard-check', expectRoles:['superadmin'], showInMenu:true}
      },
      {
        path:'perfil', component:PerfilComponent,
        // canActivate:[RoleGuard],
        data:{showInMenu:false}
      },
      {
        path:'add-gestante', component:AddGestanteComponent,
        data:{showInMenu:false}
      },
      //ruta con datos incluidos
      {
        path:'add-gestante/:id', component:AddGestanteComponent,
        data:{showInMenu:false}
      },
      {
        path:'ruta-gestante/:id', component:RutaGestanteComponent,
        data:{showInMenu:false}
      },
      {
        path:'ruta-2', component:Ruta2Component,
        data:{showInMenu:false}
      },
      {
        path:'ruta-2/:id/:num_proceso', component:Ruta2Component,
        data:{showInMenu:false}
      },
      {
        path:'ruta-3', component:Ruta3Component,
        data:{showInMenu:false}
      },
      {
        path:'ruta-3/:id/:num_proceso', component:Ruta3Component,
        data:{showInMenu:false}
      },
      {
        path:'ruta-4', component:Ruta4Component,
        data:{showInMenu:false}
      },
      {
        path:'ruta-4/:id/:num_proceso', component:Ruta4Component,
        data:{showInMenu:false}
      },
      {
        path:'ruta-5', component:Ruta5Component,
        data:{showInMenu:false}
      },
      {
        path:'ruta-5/:id/:num_proceso', component:Ruta5Component,
        data:{showInMenu:false}
      },
      {
        path:'ruta-6', component:Ruta6Component,
        data:{showInMenu:false}
      },
      {
        path:'ruta-6/:id/:num_proceso', component:Ruta6Component,
        data:{showInMenu:false}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class SharedModuleRoutingModule {
  static getRoutes(): Routes {
    return routes;
  }
}
