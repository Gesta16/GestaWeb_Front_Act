import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-mensaje',
  templateUrl: './modal-mensaje.component.html',
  styleUrl: './modal-mensaje.component.css'
})
export class ModalMensajeComponent {
  constructor(public _matDialogRef: MatDialogRef<ModalMensajeComponent>) {
  }
  cerrar(): void {
    this._matDialogRef.close();
  }
}
