import { Component } from '@angular/core';
import { MenuService } from '../../../Services/menu.service';
import { ReportesService } from '../../../Services/reportes.service';
import { PoblacionDiferencialService } from '../../../Services/poblacion-diferencial.service';
import { DepartamentoService } from '../../../Services/departamento.service';
import { AlertService } from '../../../Services/alert.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})
export class ReporteComponent {

  isExpanded = true;
  isVisible = true;

  filtros = {
    categoria: '',
    subcategoria: '',
    fecha_inicio: '',
    fecha_fin: '',
    cod_departamento: null,
    cod_municipio: null,
    cod_poblacion: null,
    formato: '',
  };

  resultados: any[] = [];

  categorias = [
    {
      nombre: 'Gestación Saludable',
      valor: 'gestacion_saludable',
      subcategorias: [
        { nombre: 'Micronutrientes', valor: 'Micronutrientes' },
        { nombre: 'Curso Prenatal', valor: 'Curso Prenatal' },
        { nombre: 'Nutrición', valor: 'Nutrición' },
        { nombre: 'Salud Bucal', valor: 'Salud Bucal' },
        { nombre: 'Psicología', valor: 'Psicología' },
        { nombre: 'Ginecología', valor: 'Ginecología' },
      ],
    },
    {
      nombre: 'Parto Humanizado',
      valor: 'parto_humanizado',
      subcategorias: [
        { nombre: 'Cesáreas', valor: 'Cesáreas' },
      ],
    },
    {
      nombre: 'Puerperio Seguro',
      valor: 'puerperio_seguro',
      subcategorias: [
        { nombre: 'Asesoría Anticonceptiva', valor: 'Asesoría Anticonceptiva' },
        { nombre: 'Métodos Anticonceptivos', valor: 'Métodos Anticonceptivos' },
      ],
    },
    {
      nombre: 'Neonatos Saludables',
      valor: 'neonatos_saludables',
      subcategorias: [
        { nombre: 'Alta oportuna', valor: 'Alta oportuna' },
      ],
    },
    {
      nombre: 'Planeación Familiar',
      valor: 'planeacion_familiar',
      subcategorias: [
        { nombre: 'Intención Reproductiva', valor: 'Intención Reproductiva' },
        { nombre: 'Consulta IVE', valor: 'Consulta IVE' },
      ],
    },
    {
      nombre: 'Gestantes Sin Riesgo',
      valor: 'gestantes_sin_riesgo',
      subcategorias: [
        { nombre: 'Tratamiento de Sífilis', valor: 'Tratamiento de Sífilis' },
      ],
    },
    {
      nombre: 'Atención Neonatal',
      valor: 'atencion_neonatal',
      subcategorias: [
        { nombre: 'Tamizaje Hipotiroidismo', valor: 'Tamizaje Hipotiroidismo' },
        { nombre: 'Vacunación', valor: 'Vacunación' },
        { nombre: 'Cardiopatías', valor: 'Cardiopatías' },
      ],
    },
  ];

  subcategorias = [];
  poblaciones = [];
  departamentos = [];

  constructor(
    private menuService: MenuService,
    private reporteService: ReportesService,
    private poblacionDifeService: PoblacionDiferencialService,
    private departamentoService: DepartamentoService,
    private alertService: AlertService
  ) { }


  ngOnInit(): void {
    this.menuService.isExpanded$.subscribe(isExpanded => {
      this.isExpanded = isExpanded;
    });
    this.menuService.menuVisible$.subscribe(isVisible => {
      this.isVisible = isVisible;
    });
    this.getPoblacionDiferencial();
    this.getDepartamentos();
  }

  onCategoriaChange() {
    const categoriaSeleccionada = this.categorias.find(cat => cat.valor === this.filtros.categoria);
    this.subcategorias = categoriaSeleccionada ? categoriaSeleccionada.subcategorias : [];
  }

  // Método para enviar los filtros y obtener los reportes
  aplicarFiltros(formato: string) {
    console.log('Aplicando filtros...', this.filtros);

    if(formato){
      this.filtros.formato = formato;
    }

    // Verificar si la subcategoría está seleccionada
    if (!this.filtros.subcategoria) {
      console.error('Error: La subcategoría es requerida.');
      this.alertService.errorAlert('Error', 'Por favor, selecciona una subcategoría.');
      return; // Detener la ejecución si no hay subcategoría
    }

    // Llamar al servicio para descargar el Excel
    this.reporteService.filtrarReportes(this.filtros).subscribe(
      (response) => {
        console.log('Descarga iniciada');
  
        // Determinar el tipo de archivo según el formato
        const mimeType =
          formato === 'pdf'
            ? 'application/pdf'
            : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        const fileExtension = formato === 'pdf' ? 'pdf' : 'xlsx';
        const blob = new Blob([response], { type: mimeType });
  
        // Crear enlace de descarga
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reporte.${fileExtension}`; // Nombre del archivo con extensión dinámica
        a.click();
  
        // Liberar el URL
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error al descargar el archivo:', error);
        this.alertService.errorAlert(
          'Error',
          'Ocurrió un error al generar el reporte. Por favor, inténtalo de nuevo.'
        );
      }
    );
  }


  getPoblacionDiferencial() {
    this.poblacionDifeService.getPoblacionDiferencial().subscribe(
      (response) => {
        console.log(response);
        this.poblaciones = response.poblacion;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getDepartamentos() {
    this.departamentoService.getDepartamentos().subscribe(
      (response) => {
        console.log(response);
        this.departamentos = response.departamento;
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
