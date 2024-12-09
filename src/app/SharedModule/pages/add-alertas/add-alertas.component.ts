import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-alertas',
  templateUrl: './add-alertas.component.html',
  styleUrl: './add-alertas.component.css'
})
export class AddAlertasComponent {

  constructor(
    public _matDialogRef: MatDialogRef<AddAlertasComponent>,
  ){}

  cerrar(): void {
    this._matDialogRef.close();
  }
 
}
