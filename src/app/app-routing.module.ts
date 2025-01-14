import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', redirectTo: 'home' },
  {
    path:'',
    loadChildren:()=>import('./AuthModule/auth.module').then(m => m.AuthModule)
  },
  {
    path:'',
    loadChildren:()=>import('./SharedModule/shared.module').then(m => m.SharedModule)
  },
  {
    path:'',
    loadChildren:()=>import('./Gestantes/gestantes.module').then(m =>m.GestantesModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
