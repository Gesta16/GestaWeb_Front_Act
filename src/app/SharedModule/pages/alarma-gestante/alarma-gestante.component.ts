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

  constructor(
    private alarmaService: SignosAlarmaService,
    public dialogRef: MatDialogRef<AlarmaGestanteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { 
      usuario_id: number,
    }
  ) {
    console.log(data.usuario_id);
    this.getSignoAlarma(data.usuario_id);
  }

  cerrar(): void {
    this.dialogRef.close();
  }

  getSignoAlarma(id: number) {
    this.alarmaService.getSignosAlarmaByUser(id).subscribe(
      (response: any) => {
        console.log(response.signo_alarma);
        if(response.signo_alarma){
          this.signoAlarma = response.signo_alarma;
        }
      },
      (error) => {
        console.error('Error al obtener signo de alarma:', error);
      }
    );
  }
}
