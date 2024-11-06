import { Component } from '@angular/core';
import { TipoDocumento } from '../../../Models/Tipo-documento.model';
import { MatDialogRef } from '@angular/material/dialog';
import { TipoDocumentoService } from '../../../Services/tipo-documento.service';
import { SuperAdminService } from '../../../Services/super-admin.service';
import { SuperAdmin } from '../../../Models/Super-admin.model';

@Component({
  selector: 'app-add-super-admin',
  templateUrl: './add-super-admin.component.html',
  styleUrl: './add-super-admin.component.css'
})
export class AddSuperAdminComponent {

  superAdmin: SuperAdmin = new SuperAdmin();

  listTipoDocumentos: TipoDocumento[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddSuperAdminComponent>,
    private superAdminService: SuperAdminService,
    private tipoDocumentoService: TipoDocumentoService
  ) { }

  ngOnInit(): void {
    this.getTipoDocumentos();
  }

  onSubmit(): void {
    this.superAdminService.createSuperAdmin(this.superAdmin).subscribe(
      response => {
        // Cierra el diálogo y pasa un valor de confirmación
        this.dialogRef.close(true);
      },
      error => {
        console.error('Error al crear SuperAdmin:', error);
      }
    );
  }

  getTipoDocumentos(): void {
    this.tipoDocumentoService.getTipoDocumentos().subscribe(
      (data: { estado: string; documento: TipoDocumento[] }) => {
        if (data.estado === "Ok" && Array.isArray(data.documento)) {
          this.listTipoDocumentos = data.documento;
        } else {
          console.error('Estructura de datos inesperada:', data);
        }
      },
      (error: any) => {
        console.error('Error al obtener los datos de Tipo Documento:', error);
      }
    );
  }

  close(): void {
    this.dialogRef.close();
  }
}
