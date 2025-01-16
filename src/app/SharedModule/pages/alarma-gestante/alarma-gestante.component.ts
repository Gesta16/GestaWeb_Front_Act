import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SignosAlarmaService } from '../../../Services/signos-alarma.service';

@Component({
  selector: 'app-alarma-gestante',
  templateUrl: './alarma-gestante.component.html',
  styleUrl: './alarma-gestante.component.css'
})
export class AlarmaGestanteComponent {

  signoAlarma: [] = [];
  sinAlert: boolean = true;
  usuario_id: number;
  signosSeleccionados: number[] = [];

  constructor(
    private alarmaService: SignosAlarmaService,
    public dialogRef: MatDialogRef<AlarmaGestanteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      usuario_id: number,
    }
  ) {
    console.log('id usuario', data.usuario_id);
    this.usuario_id = data.usuario_id;
  }

  cerrar(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getSignoAlarma(); // Obtienes las alarmas disponibles al iniciar
  }

  getSignoAlarma() {
    this.alarmaService.getSignosAlarma().subscribe(
      (response: any) => {
        //console.log('signo de alarma',response);
        if (response) {
          this.signoAlarma = response;
          this.sinAlert = false;
        }
      },
      (error) => {
        console.error('Error al obtener signo de alarma:', error);
      }
    );
  }

  // Manejar la selección/deselección de signos de alarma
  toggleSeleccion(signo_id: number): void {
    const index = this.signosSeleccionados.indexOf(signo_id);
    if (index === -1) {
      this.signosSeleccionados.push(signo_id); // Agrega el ID si no está seleccionado
    } else {
      this.signosSeleccionados.splice(index, 1); // Remueve el ID si ya está seleccionado
    }
  }

  // Asignar los signos de alarma seleccionados a la gestante
  asignarSignosAlarma(): void {
    if (this.signosSeleccionados.length === 0) {
      alert('Selecciona al menos un signo de alarma.');
      return;
    }

    this.alarmaService.asignarSignosAlarma(this.usuario_id, this.signosSeleccionados).subscribe(
      (response: any) => {
        console.log('Signos de alarma asignados correctamente:', response);
        this.dialogRef.close(true); // Cierra la modal y devuelve un valor (opcional)
      },
      (error) => {
        console.error('Error al asignar signos de alarma:', error);
      }
    );
  }

}
