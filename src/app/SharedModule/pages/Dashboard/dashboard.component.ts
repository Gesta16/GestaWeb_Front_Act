import { Component } from '@angular/core';
import { MenuService } from '../../../Services/menu.service';
import { DashboardService } from '../../../Services/dashboard.service';
import { error } from 'console';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {


  isExpanded = true;
  isVisible = true;
  total_admin:number = 0;
  total_ips:number = 0;
  total_ope:number = 0;
  total_usu:number = 0;

  constructor(
    private menuService:MenuService,
    private dashboardService:DashboardService,
  ){}

  ngOnInit(){
    this.menuService.isExpanded$.subscribe(isExpanded => {
      this.isExpanded = isExpanded;
    });
    this.getConteos();
    this.getTamizajeSifilis();
  }

  getConteos(){
    this.dashboardService.getConteo().subscribe(
      data=>{
        console.log(data);
        this.total_ips = data.total_ips;
        this.total_admin = data.total_administradores;
        this.total_ope = data.total_operadores;
        this.total_usu = data.total_usuarios;
        
      },
      error=>{
        console.log(error);
      }
    )
  }

  getTamizajeSifilis(){
    this.dashboardService.getProporcionTamizajeSifilis().subscribe(
      response=>{
        console.log(response);
      },
      error=>{
        console.log(error);
      }
    )
  }
}
