import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-alerta',
  templateUrl: './modal-alerta.component.html',
  styleUrl: './modal-alerta.component.css'
})
export class ModalAlertaComponent {

  nombre?: string;
  descripcion?: string;

  constructor(
    public dialogRef: MatDialogRef<ModalAlertaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { 
      titulo: string,
      descripcion: string
    }
  ) {
    // Asignar los valores recibidos a las variables locales
    this.nombre = data.titulo;
    this.descripcion = data.descripcion;
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
