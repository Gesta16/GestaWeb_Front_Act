import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input() cerrar!: () => void;

  cerrarModal() {
    if (this.cerrar) {
      this.cerrar();
    }
  }
}