import { Component, AfterViewInit } from '@angular/core';
import { AlertService } from '../../../Services/alert.service';
import { ImportExcelService } from '../../../Services/import-excel.service';
import { Operador } from '../../../Models/Operador.model';
import { OperadorService } from '../../../Services/operador.service';
import { Opcode } from 'hardhat/internal/hardhat-network/stack-traces/opcodes';

@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.component.html',
  styleUrl: './import-excel.component.css'
})
export class ImportExcelComponent implements AfterViewInit {

  selectedFile!: File;
  nombreExcel!: string;
  procesando = false;
  enviandose = false;
  listOperadores: Operador[] = [];
  idOperador!: string;


  constructor(
    private alertService:AlertService,
    private importExcelService:ImportExcelService,
    private operadorService:OperadorService
  ) {}

  // funcion para iniciar metodos o funciones en el sistema
  ngAfterViewInit(): void {
    this.getOperadores(); // Llamada a la función después de cargar la vista
  }

  // funcion para llamar a todos los operadores
  getOperadores(): void {
    this.operadorService.getOperadores().subscribe(
      (data: { estado: string; operador:Operador[]}) => {
        if (data.estado === "Ok" && Array.isArray(data.operador)) {
          this.listOperadores = data.operador;
        } else {
          console.error('Estructura de datos inesperada:', data);
        }
      },
      (error: any) => {
        console.error('Error al obtener los datos de OPERADOR:', error);
      }
    )
  }

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
    this.idOperador = null;
  }

  // funcion para enviar los datos del excel
  enviarExcel(): void {
    // validamos si esta enviandose
    if(!this.procesando){
      // validamos que exista el archivo y sea valido
      if (this.selectedFile && this.selectedFile != null && this.idOperador != null) {
        // evitamos que el usuario envie mas de una vez mientras se procesa
        this.procesando = true;
        // cambiamos el titulo del boton mientras se procesa
        this.enviandose = true;
        // mostramos una alerta mientras se manda y se recibe
        this.alertService.waitAlert('Espere', 'El Archivo se esta Procesado');
        // enviamos los datos a travez del servicio
        this.importExcelService.importExcel(this.selectedFile, this.idOperador).subscribe({
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
        if(this.idOperador != null){
          this.alertService.infoAlert('Error', 'No selecciono Ningún Archivo'); 
        } else {
          this.alertService.infoAlert('Error', 'No selecciono Ningún Operador');
        }
        
      }
    }
  }


}
