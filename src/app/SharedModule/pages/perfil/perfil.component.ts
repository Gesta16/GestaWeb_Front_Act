import { Component } from '@angular/core';
import { TipoDocumento } from '../../../Models/Tipo-documento.model';
import { AuthService } from '../../../Services/auth.service';
import { TipoDocumentoService } from '../../../Services/tipo-documento.service';
import { SuperAdminService } from '../../../Services/super-admin.service';
import { AdminService } from '../../../Services/admin.service';
import { OperadorService } from '../../../Services/operador.service';
import { UsuarioService } from '../../../Services/usuario.service';
import { AlertService } from '../../../Services/alert.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  isEditing: boolean = false;
  user: any;
  tiposDocumento: TipoDocumento[] = [];
  formData: any = {};

  isExpanded = true;
  isVisible = true;

  constructor(
    private authService: AuthService,
    private tipoDocumentoService: TipoDocumentoService,
    private superAdminService: SuperAdminService,
    private adminService: AdminService,
    private operadorService: OperadorService,
    private usuarioService: UsuarioService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.loadTiposDocumento();
    this.formData = { ...this.user.userable };
    console.log(this.formData)
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

  saveChanges(): void {
    if (!this.user) return;

    // Validar que las contraseñas coincidan
    if (this.formData.password !== this.formData.confirmPassword) {
      this.alertService.errorAlert('Error', 'Las contraseñas no coinciden.');
      return;
    }


    const userIdSuperadmin = this.user.userable.id_superadmin;
    const userIdAdmin = this.user.userable.id_admin;
    const userIdOperador = this.user.userable.id_operador;
    const userId = this.user.userable.id_user;

    console.log(userIdSuperadmin);
    console.log(userIdAdmin);
    // Llamar al servicio adecuado según el rol
    switch (this.user.rol_id) {
      case 1: // SuperAdmin
        this.superAdminService.updateSuperadmin(this.formData, userIdSuperadmin).subscribe(
          (response: any) => {
            this.alertService.successAlert('Exito', response.message);
            this.isEditing = false;
          },
          (error: any) => {
            console.error('Error al actualizar el perfil:', error);
            this.alertService.errorAlert('Error', error.error.message);
          }
        );
        break;

      case 2: // Admin
        this.adminService.updateAdmin(this.formData, userIdAdmin).subscribe(
          (response: any) => {
            alert('Perfil actualizado correctamente');
            this.isEditing = false;
          },
          (error: any) => {
            console.error('Error al actualizar el perfil:', error);
            this.alertService.errorAlert('Error', error.error.message);
          }
        );
        break;

      case 3: // Operador
        this.operadorService.updateOperador(this.formData, userIdOperador).subscribe(
          (response: any) => {
            alert('Perfil actualizado correctamente');
            this.isEditing = false;
          },
          (error: any) => {
            console.error('Error al actualizar el perfil:', error);
            alert('Ocurrió un error al actualizar el perfil');
          }
        );
        break;

      case 4: // Usuario
        this.usuarioService.updateUsuario(userId, this.formData).subscribe(
          (response: any) => {
            alert('Perfil actualizado correctamente');
            this.isEditing = false;
          },
          (error: any) => {
            console.error('Error al actualizar el perfil:', error);
            alert('Ocurrió un error al actualizar el perfil');
          }
        );
        break;

      default:
        console.error('Rol no soportado');
    }
  }

  onInputChange(event: any, field: string): void {
    this.formData[field] = event.target.value;
  }
}
