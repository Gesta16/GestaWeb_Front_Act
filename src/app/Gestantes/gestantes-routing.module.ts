import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotasComponent } from './pages/notas/notas.component';
import { RoleGuard } from '../guards/role.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ExamenesComponent } from './pages/examenes/examenes.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path:'dashboard-gestante', component:DashboardComponent,
        canActivate: [RoleGuard],
        data:{title: 'Dashboard', icon: 'fa-solid fa-chart-pie', expectedRoles:['usuario'], showInMenu:true}
      },
      {
        path: 'examenes', component: ExamenesComponent,
        canActivate: [RoleGuard],
        data: { title: 'Exámenes', icon: 'fas fa-calendar-day', expectedRoles: ['usuario'], showInMenu: true }
      },
      {
        path: 'notas', component: NotasComponent,
        canActivate: [RoleGuard],
        data: { title: 'Notas', icon: 'fa-solid fa-clipboard-check', expectedRoles: ['usuario'], showInMenu: true }
      },
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class GestantesRoutingModule {
  static getRoutes(): Routes {
    return routes;
  }
 }
