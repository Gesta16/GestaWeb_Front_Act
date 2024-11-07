import { Component } from '@angular/core';
import { TipoDocumento } from '../../../Models/Tipo-documento.model';
import { AuthService } from '../../../Services/auth.service';
import { TipoDocumentoService } from '../../../Services/tipo-documento.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  isEditing: boolean = false;
  user: any;
  tiposDocumento: TipoDocumento[] = [];

  isExpanded = true;
  isVisible = true;

  constructor(
    private authService: AuthService,
    private tipoDocumentoService: TipoDocumentoService,
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.loadTiposDocumento();
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
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

  getTipoDocumentoNombre(cod_documento?: number): string {
    if (cod_documento === undefined) return 'Desconocido';
    const tipo = this.tiposDocumento.find(td => td.cod_documento === cod_documento);
    return tipo ? tipo.nom_documento : '';
  }
}
