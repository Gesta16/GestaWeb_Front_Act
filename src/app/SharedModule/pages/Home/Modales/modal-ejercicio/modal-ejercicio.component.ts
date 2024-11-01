import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-ejercicio',
  templateUrl: './modal-ejercicio.component.html',
  styleUrl: './modal-ejercicio.component.css'
})
export class ModalEjercicioComponent {

  constructor(public _matDialogRef: MatDialogRef<ModalEjercicioComponent>, @Inject(MAT_DIALOG_DATA) public data:any){
  }

  cerrar(){
    this._matDialogRef.close();
  }
}
