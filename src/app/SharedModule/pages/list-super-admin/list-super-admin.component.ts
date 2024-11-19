import { Component } from '@angular/core';
import { TipoDocumento } from '../../../Models/Tipo-documento.model';
import { SuperAdminService } from '../../../Services/super-admin.service';
import { TipoDocumentoService } from '../../../Services/tipo-documento.service';
import { MatDialog } from '@angular/material/dialog';
import { AddSuperAdminComponent } from '../add-super-admin/add-super-admin.component';
import { MenuService } from '../../../Services/menu.service';

@Component({
  selector: 'app-list-super-admin',
  templateUrl: './list-super-admin.component.html',
  styleUrl: './list-super-admin.component.css'
})
export class ListSuperAdminComponent {

  superAdmins: any[] = [];
  tiposDocumento: TipoDocumento[] = [];
  paginatedSuperAdmins: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 15;
  totalPages: number = 1;

  isExpanded = true;
  isVisible = true;

  constructor(
    private superAdminService: SuperAdminService,
    private tipoDocumentoService: TipoDocumentoService,
    private _matDialog: MatDialog,
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.loadSuperAdmins();
    this.loadTiposDocumento();
    this.menuService.isExpanded$.subscribe(isExpanded => {
      this.isExpanded = isExpanded;
    });
    this.menuService.menuVisible$.subscribe(isVisible => {
      this.isVisible = isVisible;
    });
  }

  abrirModal(): void {
    const dialogRef = this._matDialog.open(AddSuperAdminComponent, {
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadSuperAdmins();
      }
    });
  }

  private loadSuperAdmins(): void {
    this.superAdminService.getSuperAdmins().subscribe(
      (response: any) => {
        this.superAdmins = response.superAdmin;
        this.updatePagination();
      },
      (error: any) => {
        console.error('Error al obtener SuperAdmins:', error);
      }
    );
  }

  private loadTiposDocumento(): void {
    this.tipoDocumentoService.getTipoDocumentos().subscribe(
      response => {
        this.tiposDocumento = response.documento;
      },
      error => {
        console.error('Error al obtener Tipos de Documento:', error);
      }
    );
  }

  getTipoDocumentoNombre(cod_documento: number): string {
    const tipo = this.tiposDocumento.find(td => td.cod_documento === cod_documento);
    return tipo ? tipo.nom_documento : 'Desconocido';
  }

  private updatePagination(): void {
    this.totalPages = Math.ceil(this.superAdmins.length / this.itemsPerPage);
    this.paginatedSuperAdmins = this.superAdmins.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
