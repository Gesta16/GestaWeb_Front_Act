import { Component } from '@angular/core';
import { AlertService } from '../../../Services/alert.service';
import { ImportExcelService } from '../../../Services/import-excel.service';

@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.component.html',
  styleUrl: './import-excel.component.css'
})
export class ImportExcelComponent {

  selectedFile!: File;
  nombreExcel!: string;
  procesando = false;
  enviandose = false;


  constructor(
    private alertService:AlertService,
    private importExcelService:ImportExcelService,
  ) {}

  // funcion para guardar la imagen y validarla
  onFileSelected(event: any) {
    // tomaamos el dato enviado y almacenamos
    const file = event.target.files[0];
    // verificiamos que fuera exitoso
    if (file) {
      // definimos extensiones validas para el archivo
      const validExtensions = ['xls', 'xlsx', 'xlsm'];
      // tomamos la extension del archivo
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      // validams que el archivo incluya la extension correcta
      if (validExtensions.includes(fileExtension)) {
        this.selectedFile = file;
        this.nombreExcel = this.selectedFile.name;  // Guarda el nombre del archivo
        this.alertService.successAlert('Exito', 'Se Cargo Correctamente'); // en caso de que fuera correcto
      } else {
        this.alertService.infoAlert('Error', 'El Archivo es Invalido'); // en caso de que no fuera correcto
        // validamos si ya tenia dato correcto, antes del dato incorrecto; para no quitarle su valor correcto
        if(!this.selectedFile){
          this.selectedFile = null; // si no tenia nada lo vuelve null
        }
      }
    }
    //console.log(this.selectedFile);
  } 

  // Maneja el arrastre de un archivo
  onDragOver(event: DragEvent): void {
    event.preventDefault(); // Evita el comportamiento por defecto
  }

  // Maneja el soltar el archivo en el área
  onDrop(event: DragEvent): void {
    event.preventDefault(); // Evita el comportamiento por defecto
    const file = event.dataTransfer?.files[0]; // Obtiene el archivo arrastrado
    if (file) {
      this.onFileSelected({ target: { files: [file] } }); // Llama al método para manejar la selección
    }
  }

  // funcion para borrar los datos del input y limpiar
  limpiarInput(mostrar: boolean): void {
    this.selectedFile = null;
    this.nombreExcel = 'Haga clic para subir o arrastre y suelte el Excel';
    if(mostrar){
      this.alertService.infoAlert('Exito', 'El Archivo se Quito');
    }
    const fileInput = document.getElementById('inputExcel') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Reinicia el valor del input file
    }
  }

  // funcion para enviar los datos del excel
  enviarExcel(): void {
    // validamos si esta enviandose
    if(!this.procesando){
      // validamos que exista el archivo y sea valido
      if (this.selectedFile && this.selectedFile != null) {
        // evitamos que el usuario envie mas de una vez mientras se procesa
        this.procesando = true;
        // cambiamos el titulo del boton mientras se procesa
        this.enviandose = true;
        // mostramos una alerta mientras se manda y se recibe
        this.alertService.waitAlert('Espere', 'El Archivo se esta Procesado');
        // enviamos los datos a travez del servicio
        this.importExcelService.importExcel(this.selectedFile).subscribe({
          // si sale bien se hara:
          next: (response) => {
            console.log(response);
            this.alertService.successAlert('Exito', 'El Excel se Importo Correctamente');
            this.limpiarInput(false); // limpiamos las cajas sin mostrar alerta
            this.enviandose = false;  // reseteamos el texto del boton
            this.procesando = false;  // volvemos activar para que se pueda enviar otravez
          },
          // si sale mal se hara:
          error: (error) => { 
            console.error('Error:', error);
            this.limpiarInput(false);
            this.procesando = false;  // volvemos activar para que se pueda enviar otravez
            this.enviandose = false;
            this.alertService.infoAlert('Error', 'Algo Salio Mal :('); 
          },
        });
      } else {
        this.alertService.infoAlert('Error', 'No selecciono Ningún Archivo');
      }
    }
  }


}
