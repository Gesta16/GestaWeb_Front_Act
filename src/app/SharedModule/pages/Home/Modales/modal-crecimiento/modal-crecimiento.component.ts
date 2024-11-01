import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-crecimiento',
  templateUrl: './modal-crecimiento.component.html',
  styleUrl: './modal-crecimiento.component.css'
})
export class ModalCrecimientoComponent {

  constructor(public _matDialogRef: MatDialogRef<ModalCrecimientoComponent>, @Inject(MAT_DIALOG_DATA) public data:any){
  }

  cerrar(){
    this._matDialogRef.close();
  }
}
