import { Component } from '@angular/core';
import { MenuService } from '../../../Services/menu.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})
export class ReporteComponent {

  isExpanded = true;
  isVisible = true;

  constructor(
    private menuService: MenuService
  ){}

  ngOnInit():void{
    this.menuService.isExpanded$.subscribe(isExpanded => {
      console.log('se expande',isExpanded);
      this.isExpanded = isExpanded;
    });
    this.menuService.menuVisible$.subscribe(isVisible => {
      console.log('es visible', isVisible);
      this.isVisible = isVisible;
    });
  }
}
