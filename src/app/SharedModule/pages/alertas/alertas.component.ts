import { Component, Inject } from '@angular/core';
import { MenuService } from '../../../Services/menu.service';
import { MatDialog } from '@angular/material/dialog';
import { AddAlertasComponent } from '../add-alertas/add-alertas.component';


@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrl: './alertas.component.css'
})
export class AlertasComponent {
  paginatedAlerta: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  isExpanded = true;
  isVisible = true;

  constructor(
    private menuService: MenuService,
    private _matDialog: MatDialog,
  ) { }

  ngOnInit() {
    this.menuService.isExpanded$.subscribe(isExpanded => {
      this.isExpanded = isExpanded;
    });
    this.menuService.menuVisible$.subscribe(isVisible => {
      this.isVisible = isVisible;
    });
  }


  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    // this.updatePagination();
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  abrirModal(): void {
    this._matDialog.open(AddAlertasComponent, {
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms'
    });
  }
}
