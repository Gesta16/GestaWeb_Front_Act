import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SignosAlarmaService } from '../../../Services/signos-alarma.service';
import { SignoAlarma } from '../../../Models/Signos-Alarma.model';
import { AlertService } from '../../../Services/alert.service';
import { UsuarioService } from '../../../Services/usuario.service';

@Component({
  selector: 'app-add-alertas',
  templateUrl: './add-alertas.component.html',
  styleUrl: './add-alertas.component.css'
})
export class AddAlertasComponent {

  signosAlarma:SignoAlarma = new SignoAlarma();


  constructor(
    public _matDialogRef: MatDialogRef<AddAlertasComponent>,
    private signosAlarmaService: SignosAlarmaService,
    private alertService: AlertService,
    private usuarioService: UsuarioService,
  ){}

  cerrar(valor: boolean): void {
    this._matDialogRef.close(valor);
  }

  createSignoAlarma(alertaform: any) {

    // validamos que el formulario esté completo
    if (alertaform.invalid) {
      this.alertService.infoAlert('Error', 'Por favor, complete el formulario.');
      // marcamos los campos como touched para que se muestren los errores
      Object.keys(alertaform.controls).forEach(field => {
        const control = alertaform.controls[field];
        control.markAsTouched({ onlySelf: true });
      }); 
      return;
    }

    this.signosAlarmaService.createSignoAlarma(this.signosAlarma).subscribe(
      response => {
        this.alertService.successAlert('Éxito', 'Se guardo la alerta').then(() => {
          this.cerrar(true); // Cierra el modal con un valor true para indicar éxito
        });
      },
      error => {
        this.alertService.errorAlert('Error', error.error.error);
        console.error('Error al crear IPS:', error);
      }
    );
  }
 
}
