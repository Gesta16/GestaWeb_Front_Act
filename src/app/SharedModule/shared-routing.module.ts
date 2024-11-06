import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/Home/home.component';
import { DashboardComponent } from './pages/Dashboard/dashboard.component';
import { RoleGuard } from '../guards/role.guard';
import { ListAdminComponent } from './pages/list-admin/list-admin.component';
import { ListIpsComponent } from './pages/list-ips/list-ips.component';
import { ListSuperAdminComponent } from './pages/list-super-admin/list-super-admin.component';
import { ListOperadoresComponent } from './pages/list-operadores/list-operadores.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'home', component: HomeComponent, data: { title: 'Inicio', showInMenu: false } },
      {
        path: 'dashboard', component: DashboardComponent,
        canActivate: [RoleGuard],
        data: {
          title: 'Dashboard', icon: 'fa-solid fa-home', expectedRoles: ['superadmin', 'admin'], showInMenu: true
        }
      },
      {
        path: 'list-admin', component: ListAdminComponent, 
        canActivate:[RoleGuard],
        data: { title: 'Admin', icon: 'fa-solid fa-home', expectedRoles: ['superadmin', 'admin'], showInMenu: true }
      },
      {
        path:'list-ips', component:ListIpsComponent,
        canActivate:[RoleGuard],
        data:{title:'IPS', icon:'fa-solid fa-home', expectedRoles:['superadmin'], showInMenu:true}
      },
      {
        path:'list-superadmin', component:ListSuperAdminComponent,
        canActivate:[RoleGuard],
        data:{title:'SuperAdmin', icon:'fa-solid fa-home', expectedRoles:['superadmin'], showInMenu:true}
      },
      {
        path:'list-operadores', component:ListOperadoresComponent,
        canActivate:[RoleGuard],
        data:{title:'Operadores', icon:'fa-solid fa-home', expectedRoles:['superadmin'], showInMenu:true}
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
