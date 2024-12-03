import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../Services/menu.service';
import { AuthService } from '../../../Services/auth.service';  // Importar el AuthService
import { UsuarioService } from '../../../Services/usuario.service';  // Importar el UsuarioService

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isExpanded = true;
  isVisible = true;  // Controla el estado del menú lateral
  isModalVisible = false;  // Controla la visibilidad del modal

  constructor(
    private menuService: MenuService, 
    private authService: AuthService,
    private usuarioService: UsuarioService  // Inyectar el servicio de usuario
  ) { }

  ngOnInit() {
    this.menuService.isExpanded$.subscribe(isExpanded => {
      this.isExpanded = isExpanded;
    });

    // Verificamos si los términos han sido aceptados
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.userable.autorizacion === 0) {
      this.isModalVisible = true;  // Mostrar el modal si el campo 'autorizacion' es 0
    }
  }

  handleModalClose(isAccepted: boolean): void {
    if (isAccepted) {
      console.log('Usuario aceptó los términos');
      
      // Obtener el currentUser
      const currentUser = this.authService.currentUserValue;
  
      // Verificar que el usuario y userable están correctamente definidos
      if (currentUser && currentUser.userable && currentUser.userable.id_usuario) {
        // Acceder a id_usuario de userable
        const usuarioId = currentUser.userable.id_usuario;
  
        console.log('ID del usuario:', usuarioId);
        console.log('currentUser.userable:', currentUser.userable);
  
        // Actualizar la autorización
        currentUser.userable.autorizacion = 1;
  
        // Llamar al servicio para hacer la actualización en la base de datos
        this.usuarioService.updateUsuario(usuarioId, currentUser.userable).subscribe({
          next: (response) => {
            console.log('Autorización actualizada correctamente', response);
            this.isModalVisible = false;  // Ocultar el modal si la actualización fue exitosa
          },
          error: (err) => {
            console.error('Error al actualizar autorización', err);
          }
        });
      } else {
        console.error('No se encontró el ID del usuario');
      }
    } else {
      console.log('Usuario no aceptó los términos');
    }
  }
  
  
}
