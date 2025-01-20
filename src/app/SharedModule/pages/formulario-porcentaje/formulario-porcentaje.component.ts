import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-formulario-porcentaje',
  templateUrl: './formulario-porcentaje.component.html',
  styleUrl: './formulario-porcentaje.component.css'
})
export class FormularioPorcentajeComponent {
  @Input() totalInputs: number = 0; // Total de inputs
  @Input() answeredInputs: number = 0; // Inputs respondidos

  get porcentaje(): number {
    return this.totalInputs > 0
      ? Math.round((this.answeredInputs / this.totalInputs) * 100)
      : 0;
  }

}
