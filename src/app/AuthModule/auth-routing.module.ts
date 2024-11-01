import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path:'login', component:LoginComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AuthModuleRoutingModule {
  static getRoutes():Routes{
    return routes;
  }
 }
