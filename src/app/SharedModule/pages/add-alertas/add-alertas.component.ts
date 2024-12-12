import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SignosAlarmaService } from '../../../Services/signos-alarma.service';
import { SignoAlarma } from '../../../Models/Signos-Alarma.model';

@Component({
  selector: 'app-add-alertas',
  templateUrl: './add-alertas.component.html',
  styleUrl: './add-alertas.component.css'
})
export class AddAlertasComponent {

  signosAlarma:SignoAlarma = new SignoAlarma();


  constructor(
    public _matDialogRef: MatDialogRef<AddAlertasComponent>,
    private signosAlarmaService: SignosAlarmaService
  ){}

  cerrar(): void {
    this._matDialogRef.close();
  }

  createSignoAlarma() {
    this.signosAlarmaService.createSignoAlarma(this.signosAlarma).subscribe((res: any) => {
      console.log(res);
    });
  }
 
}
