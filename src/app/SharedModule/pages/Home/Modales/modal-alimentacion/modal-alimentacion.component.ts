import { Component, Inject } from '@angular/core';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-modal-alimentacion',
  templateUrl: './modal-alimentacion.component.html',
  styleUrl: './modal-alimentacion.component.css'
})
export class ModalAlimentacionComponent {

  constructor(public _matDialogRef: MatDialogRef<ModalAlimentacionComponent>, @Inject(MAT_DIALOG_DATA) public data:any){
  }

  cerrar(){
    this._matDialogRef.close();
  }
}
