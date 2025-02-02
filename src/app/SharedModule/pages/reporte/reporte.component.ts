import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../Services/menu.service';
import { ReportesService } from '../../../Services/reportes.service';
import { AlertService } from '../../../Services/alert.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  isExpanded = true;
  isVisible = true;

  // Estructura de filtros
  filtros = {
    tablasSeleccionadas: [] as string[],
    camposSeleccionados: [] as string[],
    fecha_inicio: '',
    fecha_fin: '',
    formato: ''
  };

  // Datos dinámicos
  tablasDisponibles = [
    { key: 'control_prenatal', nombre: 'Control Prenatal' },
    { key: 'primera_consulta', nombre: 'Primera Consulta' },
    { key: 'vacunacion', nombre: 'Vacunación' },
    { key: 'laboratorio_i_trimestre', nombre: 'Laboratorio I Trimestre' },
    { key: 'laboratorio_ii_trimestre', nombre: 'Laboratorio II Trimestre' },
    { key: 'laboratorio_iii_trimestre', nombre: 'Laboratorio III Trimestre' },
    { key: 'its', nombre: 'Its' },
    { key: 'seguimiento_consulta_mensual', nombre: 'Seguimiento Consulta Mensual' },
    { key: 'seguimientos_complementarios', nombre: 'Seguimientos Complementarios' },
    { key: 'micronutrientes', nombre: 'Micronutrientes' },
    { key: 'finalizacion_gestacion', nombre: 'Finalizacion Gestacion' },
    { key: 'laboratorios_intraparto_gestante', nombre: 'Laboratorios Intraparto de la Gestante' },
    { key: 'seguimiento_gestante_post_obstetrico', nombre: 'Seguimiento Gestante Post Obstetrico' },
    { key: 'mortalidad_preparto', nombre: 'Mortalidad Preparto' },
    { key: 'datos_recien_nacido', nombre: 'Datos Recien Nacido' },
    { key: 'tamizacion_neonatal', nombre: 'Tamizacion Neonatal' },
    { key: 'estudio_hipotiroidismo_congenito', nombre: 'Estudio Hipotiroidismo Congenito' },
    { key: '_ruta__p_y_m_s', nombre: 'Ruta PYMS' },
  ];

  camposPorTabla: { [key: string]: string[] } = {};

  constructor(
    private menuService: MenuService,
    private reporteService: ReportesService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.menuService.isExpanded$.subscribe(isExpanded => {
      this.isExpanded = isExpanded;
    });

    this.menuService.menuVisible$.subscribe(isVisible => {
      this.isVisible = isVisible;
    });
  }

  compareTablas(a: any, b: any): boolean {
    return a === b; // Comparación simple para strings
  }

  cargarCategorias() {
    this.reporteService.getCategorias().subscribe({
      next: (response) => {
        this.tablasDisponibles = response.map((cat: any) => ({
          key: cat.id.toString(), // Ajusta según la estructura de tu respuesta
          nombre: cat.nombre
        }));
      },
      error: (err) => console.error('Error cargando categorías:', err)
    });
  }

  actualizarSeleccion(event: Event, valor: string) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.filtros.camposSeleccionados.push(valor);
    } else {
      const index = this.filtros.camposSeleccionados.indexOf(valor);
      if (index > -1) {
        this.filtros.camposSeleccionados.splice(index, 1);
      }
    }
  }

  // Método para agregar/quitar tablas del array
  toggleTablaSeleccionada(tablaKey: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.filtros.tablasSeleccionadas.push(tablaKey);
      this.camposPorTabla[tablaKey] = []; // Inicializa como array vacío
      this.cargarCamposTabla(tablaKey);
    } else {
      const index = this.filtros.tablasSeleccionadas.indexOf(tablaKey);
      if (index > -1) {
        this.filtros.tablasSeleccionadas.splice(index, 1);
        delete this.camposPorTabla[tablaKey];
      }
    }
  }

  // Cargar campos de una tabla
  cargarCamposTabla(tablaKey: string) {
    const tablaNormalizada = tablaKey.toLowerCase().replace(/ /g, '_');
    this.reporteService.getSubcategorias(tablaNormalizada).subscribe({
      next: (response) => {
        this.camposPorTabla[tablaKey] = Object.values(response);
      },
      error: (err) => console.error('Error cargando campos:', err)
    });
  }

  // Cuando cambian las tablas seleccionadas
  onTablasSeleccionadasChange() {
    // Asegurar que sigue siendo un array
    this.filtros.tablasSeleccionadas = [...new Set(this.filtros.tablasSeleccionadas)];

    this.filtros.tablasSeleccionadas.forEach(tablaKey => {
      const tablaNormalizada = tablaKey.toLowerCase().replace(/ /g, '_');

      // Evitar recargar si ya tiene datos
      if (!this.camposPorTabla[tablaKey]) {
        this.reporteService.getSubcategorias(tablaNormalizada).subscribe({
          next: (response) => {
            this.camposPorTabla[tablaKey] = Object.values(response);
          },
          error: (err) => console.error('Error:', err)
        });
      }
    });
  }


  // Validar y enviar filtros
  aplicarFiltros(formato: string) {
    // Validar antes de enviar
    if (this.filtros.tablasSeleccionadas.length === 0 || this.filtros.camposSeleccionados.length === 0) {
      this.alertService.errorAlert('Error', 'Selecciona al menos una tabla y un campo');
      return;
    }

    const payload = {
      tablas: this.filtros.tablasSeleccionadas,
      campos: this.filtros.camposSeleccionados,
      fecha_inicio:this.filtros.fecha_inicio,
      fecha_fin: this.filtros.fecha_fin,
      formato: formato
    };

    console.log(payload);

    this.reporteService.generarReporteDinamico(payload).subscribe({
      next: (response) => this.descargarArchivo(response, formato),
      error: (err) => {
        // Convertir el Blob de error a texto
        err.error.text().then((errorMessage: string) => {
          const error = JSON.parse(errorMessage);
          this.alertService.errorAlert('Error', error.message || 'Error desconocido');
        });
      }
    });
  }

  obtenerNombreTabla(key: string): string {
    const tabla = this.tablasDisponibles.find(t => t.key === key);
    return tabla ? tabla.nombre : key; // Devuelve el nombre o la clave si no se encuentra
  }

  // Manejar descarga de archivo
  private descargarArchivo(response: Blob, formato: string): void {
    const extension = formato === 'pdf' ? 'pdf' : 'xlsx';
    const blob = new Blob([response], { type: response.type });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `reporte_${new Date().toISOString().slice(0, 10)}.${extension}`;
    link.click();

    window.URL.revokeObjectURL(url);
  }

  // Seleccionar todos los campos de una tabla
  seleccionarTodosCampos(tablaKey: string) {
    const camposTabla = this.camposPorTabla[tablaKey] || [];
    const camposCompletos = camposTabla.map(campo => `${tablaKey}.${campo}`);

    // Eliminar duplicados y campos ya existentes
    const nuevosCampos = [...new Set([...this.filtros.camposSeleccionados, ...camposCompletos])];
    this.filtros.camposSeleccionados = nuevosCampos;
  }

  // Deseleccionar todos los campos de una tabla
  deseleccionarTodosCampos(tablaKey: string) {
    const prefijo = `${tablaKey}.`;
    this.filtros.camposSeleccionados = this.filtros.camposSeleccionados
      .filter(campo => !campo.startsWith(prefijo));
  }

  // Verificar si todos los campos están seleccionados (Opcional para estilo)
  todosSeleccionados(tablaKey: string): boolean {
    const camposTabla = this.camposPorTabla[tablaKey] || [];
    return camposTabla.every(campo =>
      this.filtros.camposSeleccionados.includes(`${tablaKey}.${campo}`)
    );
  }
}
