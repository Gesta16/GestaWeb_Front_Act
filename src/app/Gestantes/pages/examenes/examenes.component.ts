import { Component } from '@angular/core';
import { MenuService } from '../../../Services/menu.service';

@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrl: './examenes.component.css'
})
export class ExamenesComponent {

  isExpanded = true;
  isVisible = true;

  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit() {
    this.menuService.isExpanded$.subscribe(isExpanded => {
      this.isExpanded = isExpanded;
    });
  }
}
