import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

   /* Muestra una alerta de éxito en forma de toast */
   successAlert(title: string, text: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
      customClass: {
        popup: 'bg-blue-100', 
        title: 'text-sky-500'
      }
    });
    Toast.fire({
      icon: "success",
      iconColor: "#00B3ED",
      title: text
    });
  }

  /* Muestra una alerta de error en forma de toast */
  errorAlert(title: string, text: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
      customClass: {
        popup: 'bg-orange-50',
        title: 'text-orange-700'
      }
    });
    Toast.fire({
      icon: "error",
      text: text,
      iconColor: "#FA7D00"
    });
  }
}
