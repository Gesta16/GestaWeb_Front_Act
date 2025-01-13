import { Component, Inject } from '@angular/core';
import { MenuService } from '../../../Services/menu.service';
import { MatDialog } from '@angular/material/dialog';
import { AddAlertasComponent } from '../add-alertas/add-alertas.component';
import { SignosAlarmaService } from '../../../Services/signos-alarma.service';
import { SignoAlarma } from '../../../Models/Signos-Alarma.model';


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
  signosAlarma: SignoAlarma[] = [];

  constructor(
    private menuService: MenuService,
    private _matDialog: MatDialog,
    private signosAlarmaService: SignosAlarmaService
  ) { }

  ngOnInit() {
    this.menuService.isExpanded$.subscribe(isExpanded => {
      this.isExpanded = isExpanded;
    });
    this.menuService.menuVisible$.subscribe(isVisible => {
      this.isVisible = isVisible;
    });
    this.getSignosAlarma();
  }

  abrirModal(): void {
    const dialogRef = this._matDialog.open(AddAlertasComponent, {
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.getSignosAlarma();
      }
    });
  }

  getSignosAlarma() {
    this.signosAlarmaService.getSignosAlarma().subscribe(
      (res: any) => {
        console.log(res);
        this.signosAlarma = res;
        this.updatePagination();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  private updatePagination(): void {
    this.totalPages = Math.ceil(this.signosAlarma.length / this.itemsPerPage);
    this.paginatedAlerta = this.signosAlarma.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);

    console.log(this.paginatedAlerta);
  }

}
