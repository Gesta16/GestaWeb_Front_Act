import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../../Services/reportes.service';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-reportes-ruta-gestacional',
  templateUrl: './reportes-ruta-gestacional.component.html',
  styleUrls: ['./reportes-ruta-gestacional.component.css']
})
export class ReportesRutaGestacionalComponent implements OnInit {

  usuarioId: any;
  rutaGestacional: any = null;
  loading: boolean = true;
  error: string | null = null;
  subcategorias: any[] = []; // Lista de subcategorías obtenidas del backend
  categoriaSeleccionada: any = null;  // O define una interfaz específica
  subcategoriaSeleccionada: any | null = null; // Subcategoría seleccionada

  categorias = [
    {
      nombre: 'Control Prenatal',
      datos: [
        { campo: 'Fecha de Control', valor: '2023-01-01' },
        { campo: 'Observaciones', valor: 'Todo en orden' },
      ],
    },
    {
      nombre: 'Laboratorios',
      subcategorias: [
        {
          nombre: 'Primer Trimestre',
          datos: [
            { campo: 'Fecha', valor: '2023-01-15' },
            { campo: 'Resultados', valor: 'Normal' },
          ],
        },
        {
          nombre: 'Segundo Trimestre',
          datos: [
            { campo: 'Fecha', valor: '2023-04-15' },
            { campo: 'Resultados', valor: 'Sin hallazgos' },
          ],
        },
        {
          nombre: 'Tercer Trimestre',
          datos: [
            { campo: 'Fecha', valor: '2023-07-15' },
            { campo: 'Resultados', valor: 'Normal' },
          ],
        },
      ],
    },
    {
      nombre: 'Finalización de la Gestación',
      datos: [
        { campo: 'Fecha de Parto', valor: '2023-09-01' },
        { campo: 'Tipo de Parto', valor: 'Normal' },
      ],
    },
    {
      nombre: 'Datos del Recién Nacido',
      datos: [
        { campo: 'Peso al Nacer', valor: '3.2 kg' },
        { campo: 'Talla al Nacer', valor: '50 cm' },
      ],
    },
  ];

  constructor(
    private reportesService: ReportesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    console.log('Current User:', currentUser); // Debug

    this.usuarioId = currentUser?.userable.id_usuario;
    console.log('Usuario ID:', this.usuarioId); // Debug

    this.aplicarFiltros()

    
  }

  onCategoriaChange() {
    this.subcategoriaSeleccionada = null; // Reinicia la subcategoría seleccionada
  }


  aplicarFiltros() {
    if (!this.categoriaSeleccionada) {
      this.error = 'Debe seleccionar una categoría';
      return;
    }
  
    this.loading = true;
    this.error = null;
  
    // Extraer los nombres de la categoría y subcategoría
    const categoriaNombre = this.categoriaSeleccionada?.nombre || null;
    const subcategoriaNombre = this.subcategoriaSeleccionada?.nombre || null;
  
    // Obtener el idUsuario
    const idUsuario = this.authService.currentUserValue?.userable.id_usuario;
  
    if (!idUsuario) {
      this.error = 'No se pudo obtener el ID del usuario';
      this.loading = false;
      return;
    }
  
    // Descargar el PDF
    this.reportesService
      .descargarPdf(idUsuario, categoriaNombre, subcategoriaNombre)
      .subscribe({
        next: (response: Blob) => {
          // Crear un enlace temporal para descargar el PDF
          const url = window.URL.createObjectURL(response);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'ruta_gestacional.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
  
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al descargar el PDF:', error);
          this.error = 'Error al descargar el PDF';
          this.loading = false;
        },
      });
  }
}
