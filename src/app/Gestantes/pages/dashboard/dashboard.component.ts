import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../Services/menu.service';
import { AuthService } from '../../../Services/auth.service';  // Importar el AuthService

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isExpanded = true;
  isVisible = true;  // Controla el estado del menú lateral
  isModalVisible = false;  // Controla la visibilidad del modal

  constructor(private menuService: MenuService, private authService: AuthService) { }

  ngOnInit() {
    this.menuService.isExpanded$.subscribe(isExpanded => {
      this.isExpanded = isExpanded;
    });

    // Verificamos si los términos han sido aceptados
    if (!this.authService.isTermsAccepted()) {
      this.isModalVisible = true;  // Mostrar el modal si los términos no han sido aceptados
    }
  }

  // Este método maneja el resultado del modal
  handleModalClose(isAccepted: boolean): void {
    if (isAccepted) {
      console.log('Usuario aceptó los términos');
      // Aquí puedes actualizar el estado de aceptación de términos
      const currentUser = this.authService.currentUserValue;
      currentUser.userable.autorizacion = 1;  // Actualizamos el estado de autorización
      sessionStorage.setItem('currentUser', JSON.stringify(currentUser));  // Guardamos el nuevo estado

      // Si el modal se cierra aceptando los términos, ocultamos el modal
      this.isModalVisible = false;
    } else {
      console.log('Usuario no aceptó los términos');
      // Aquí podrías redirigir al usuario o hacer alguna otra acción
      // Ejemplo: this.router.navigate(['/aceptar-terminos']);
    }
  }
}
