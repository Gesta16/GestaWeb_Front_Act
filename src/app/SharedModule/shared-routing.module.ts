import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/Home/home.component';
import { DashboardComponent } from './pages/Dashboard/dashboard.component';
import { RoleGuard } from '../guards/role.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'home', component: HomeComponent, data:{title:'Inicio', showInMenu:false} },
      {
        path: 'dashboard', component: DashboardComponent,
        canActivate: [RoleGuard],
        data: {
          title: 'Dashboard', icon: 'fa-solid fa-home', expectedRoles: ['superadmin', 'admin'], showInMenu: true
        }
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
