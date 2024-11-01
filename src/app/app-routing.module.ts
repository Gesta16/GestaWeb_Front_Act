import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path:'',
    loadChildren:()=>import('./AuthModule/auth.module').then(m => m.AuthModule)
  },
  {
    path:'',
    loadChildren:()=>import('./SharedModule/shared.module').then(m => m.SharedModule)
  },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
