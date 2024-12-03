import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';  // Asegúrate de importar AuthService

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  isVisible = true;  
  isAccepted = false;
  showErrorMessage = false;  // Variable para controlar la visibilidad del mensaje de error

  @Output() closeModalEvent = new EventEmitter<boolean>();

  constructor(private authService: AuthService) { }  

  // Función que se llama cuando el usuario hace clic en los botones
  closeModal(isAccepted: boolean): void {
    if (isAccepted) {
      this.isVisible = false; 
      this.closeModalEvent.emit(true);  // Emitir el valor de aceptación
    } else {
      this.isVisible = false; 
      this.closeModalEvent.emit(false);  // Emitir el valor de rechazo
      
      this.authService.logout();  // Log out si el usuario rechaza
    }
  }

  // Método para verificar si el checkbox está marcado
  isAcceptButtonEnabled(): boolean {
    return this.isAccepted;  
  }

  // Función que maneja el clic en "Enviar"
  handleSendClick(): void {
    if (!this.isAccepted) {
      this.showErrorMessage = true;  // Mostrar mensaje si no ha aceptado
    } else {
      this.showErrorMessage = false;  // Si aceptó, ocultar el mensaje de error
      this.closeModal(true);  // Llamar al método para cerrar el modal con aceptación
    }
  }
}
