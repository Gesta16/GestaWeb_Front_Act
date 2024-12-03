import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  isVisible = true;  // El modal está visible por defecto
  isAccepted = false; // Estado del checkbox (aceptado o no)

  // EventEmitter para emitir el resultado (aceptado o rechazado)
  @Output() closeModalEvent = new EventEmitter<boolean>();

  // Función que se llama cuando el usuario hace clic en los botones
  closeModal(isAccepted: boolean): void {
    if (isAccepted) {
      this.isVisible = false; // Cierra el modal solo si el checkbox está marcado
      this.closeModalEvent.emit(true); // Emitir que se aceptaron los términos
    } else {
      this.isVisible = false; // Cierra el modal también si se rechaza
      this.closeModalEvent.emit(false); // Emitir que no se aceptaron los términos
    }
  }

  // Método para verificar si el checkbox está marcado
  isAcceptButtonEnabled(): boolean {
    return this.isAccepted;  // El botón está habilitado solo si isAccepted es true
  }
}
