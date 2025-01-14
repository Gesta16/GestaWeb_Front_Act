import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SignosAlarmaService } from '../../../Services/signos-alarma.service';
import { SignoAlarma } from '../../../Models/Signos-Alarma.model';
import { AlertService } from '../../../Services/alert.service';
import { read } from 'fs';


@Component({
  selector: 'app-add-alertas',
  templateUrl: './add-alertas.component.html',
  styleUrl: './add-alertas.component.css'
})
export class AddAlertasComponent {

  signosAlarma: SignoAlarma = new SignoAlarma();
  readonly: boolean = false;

  constructor(
    public _matDialogRef: MatDialogRef<AddAlertasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private signosAlarmaService: SignosAlarmaService,
    private alertService: AlertService,
  ){}

  ngOnInit(): void {
    if (this.data && this.data.alarma) {
      this.signosAlarma = { ...this.data.alarma };
      this.readonly = true;
    }
  }

  cerrar(valor: boolean): void {
    this._matDialogRef.close(valor);
  }

  onSubmit(alertaform: any): void {
    if (this.signosAlarma.id > 0) {
      // Si existe un código de IPS, significa que estamos editando
      this.updateSignoAlarma(alertaform);
    } else {
      // Si no existe código de IPS, estamos agregando una nueva
      this.createSignoAlarma(alertaform);
    }
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

  updateSignoAlarma(alertaform: any) {
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

    this.signosAlarmaService.updateSignoAlarma(this.signosAlarma).subscribe(
      response => {
        this.alertService.successAlert('Éxito', 'Se actualizo la alerta').then(() => {
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
