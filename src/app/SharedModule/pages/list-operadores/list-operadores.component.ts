import { Component, HostListener } from '@angular/core';
import { TipoDocumento } from '../../../Models/Tipo-documento.model';
import { OperadorService } from '../../../Services/operador.service';
import { TipoDocumentoService } from '../../../Services/tipo-documento.service';
import { MatDialog } from '@angular/material/dialog';
import { AddOperadoresComponent } from '../add-operdores/add-operdores.component';
import { MenuService } from '../../../Services/menu.service';

@Component({
  selector: 'app-list-operadores',
  templateUrl: './list-operadores.component.html',
  styleUrl: './list-operadores.component.css'
})
export class ListOperadoresComponent {

  title = 'modal';
  isSmallScreen: boolean = false;
  operadores: any[] = [];
  tiposDocumento: TipoDocumento[] = [];
  paginatedOperadores: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  isExpanded = true;
  isVisible = true;

  constructor(
    private operadorService: OperadorService,
    private tipoDocumentoService: TipoDocumentoService,
    private _matDialog: MatDialog,
    private menuService: MenuService
  ) { }

  ngOnInit() {
    this.checkScreenSize();
    this.loadOperadores();
    this.loadTiposDocumento();
    this.menuService.isExpanded$.subscribe(isExpanded => {
      this.isExpanded = isExpanded;
    });
    this.menuService.menuVisible$.subscribe(isVisible => {
      this.isVisible = isVisible;
    });
  }

  private checkScreenSize() {
    if (typeof window !== 'undefined') {
      this.isSmallScreen = window.innerWidth < 1024;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (typeof window !== 'undefined') {
      this.isSmallScreen = event.target.innerWidth < 1024;
    }
  }

  abrirModal(): void {
    const dialogRef = this._matDialog.open(AddOperadoresComponent, {
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadOperadores();
      }
    });
  }

  private loadOperadores(): void {
    this.operadorService.getOperadores().subscribe(
      (response: any) => {
        this.operadores = response.operador;
        this.updatePagination();
      },
      (error: any) => {
        console.error('Error al obtener Operadores:', error);
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
    this.totalPages = Math.ceil(this.operadores.length / this.itemsPerPage);
    this.paginatedOperadores = this.operadores.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
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
