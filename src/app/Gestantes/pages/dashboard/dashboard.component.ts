import { Component } from '@angular/core';
import { MenuService } from '../../../Services/menu.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isExpanded = true;
  isVisible = true;
  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.menuService.isExpanded$.subscribe(isExpanded => {
      this.isExpanded = isExpanded;
    });
  }
}
