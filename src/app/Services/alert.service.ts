import { Injectable } from '@angular/core';
import { promises } from 'dns';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

   /* Muestra una alerta de éxito en forma de toast */
   successAlert(title: string, text: string): Promise<any> {
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
    });
  
    return Toast.fire({
      icon: "success",
      title: text,
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

    });
    Toast.fire({
      icon: "error",
      text: text,
    });
  }

  /* Muestra una alerta de error en forma de toast */
  waitAlert(title: string, text: string) {
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

    });
    Toast.fire({
      icon: "info",
      text: text,
    });
  }

  /*Muestra una alerta de advertencia*/
  infoAlert(title: string, text: string): Promise<any> {
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

    });
    return Toast.fire({
      icon: "warning",
      text: text,
    });
  }
}
