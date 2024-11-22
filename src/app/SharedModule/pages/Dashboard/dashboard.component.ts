import { Component } from '@angular/core';
import { MenuService } from '../../../Services/menu.service';
import { DashboardService } from '../../../Services/dashboard.service';
import * as echarts from 'echarts';
import { features } from 'process';
import { response } from 'express';
import { AuthService } from '../../../Services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {


  isExpanded = true;
  isVisible = true;
  total_admin: number = 0;
  total_ips: number = 0;
  total_ope: number = 0;
  total_usu: number = 0;
  chartInstance: any;
  charOptionsTamizajeSifi: echarts.EChartsOption;
  chartOptionsSeguimientos: echarts.EChartsOption;
  chartOptionsMortalidad: echarts.EChartsOption;
  chartOptionsConsultasIve: echarts.EChartsOption;
  user: any;
  chartInstances: Record<string, any> = {};

  constructor(
    private menuService: MenuService,
    private dashboardService: DashboardService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.user = this.authService.currentUserValue;
    console.log(this.user);
    console.log(this.user.rol_id);
    console.log(this.user.userable.cod_ips);
    this.menuService.isExpanded$.subscribe(isExpanded => {
      this.isExpanded = isExpanded;
    });
    this.getConteos();
    this.getTamizajeSifilis();
    this.getSeguimientosComplementarios();
    this.getMortalidadNeonatal();
    this.getConsultasIve();
  }

  getConteos() {
    this.dashboardService.getConteo().subscribe(
      data => {
        //console.log(data);
        this.total_ips = data.total_ips;
        this.total_admin = data.total_administradores;
        this.total_ope = data.total_operadores;
        this.total_usu = data.total_usuarios;

      },
      error => {
        console.log(error);
      }
    )
  }

  getTamizajeSifilis() {
    this.dashboardService.getProporcionTamizajeSifilis().subscribe(
      (response) => {
        console.log(response);
        this.charOptionsTamizajeSifi = {
          title: {
            text: 'Proporción de Tamizaje para Sífilis por Trimestre',
            left:'center'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['1 Trimestre', '2 Trimestre', '3 Trimestre']
          },

          xAxis: {
            type: 'category',
            data: ['I Trimestre', 'II Trimestre', 'III Trimestre']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: 'Proporción Tamizaje (%)',
              type: 'bar',
              data: [
                parseFloat(response['I Trimestre'].proporcion_tamizaje),
                parseFloat(response['II Trimestre'].proporcion_tamizaje),
                parseFloat(response['III Trimestre'].proporcion_tamizaje)
              ],
              markPoint: {
                data: [
                  { type: 'max', name: 'Max' },
                  { type: 'min', name: 'Min' }
                ]
              },
              markLine: {
                data: [{ type: 'average', name: 'Avg' }]
              },
            }
          ]
        };
        this.initChart('tamizajeChart', this.charOptionsTamizajeSifi);
      },
      (error) => {
        console.log(error);
      }
    )
  }


  getSeguimientosComplementarios() {
    this.dashboardService.getCoverageData(this.user.rol_id, this.user.userable.cod_ips).subscribe(
      (response) => {
        const chartData = Object.keys(response).map(key => {
          return {
            name: key.replace('total_', ''),
            value: response[key] || 0
          };
        });
        console.log(response);
        this.chartOptionsSeguimientos = {
          title: {
            text: 'Seguimientos complementarios',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'horizontal',
            left: 'center',
            top:40
          },
          series: {
            name: 'Datos',
            type: 'pie',
            data: chartData,
            top:40,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        }
        this.initChart('seguimientoChart', this.chartOptionsSeguimientos);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  getMortalidadNeonatal() {
    this.dashboardService.getNeonatalMortalityRate(this.user.rol_id, this.user.userable.cod_ips).subscribe(
      (response) => {
        const chartData = response.map(item => ({
          name: item.mes,
          value: item.total_neonatal_temprana
        }));
        console.log('Datos de mortalidad neonatal:', chartData);

        this.chartOptionsMortalidad = {
          title:{
            text:'Mortalidad Neonatal Temprana',
            left:'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          xAxis: {
            type: 'category',
            data: response.map(item => item.mes)
          },
          yAxis: [
            {
              type: 'value',
              name: 'Casos',
              position: 'left'
            },
            {
              type: 'value',
              name: 'Tendencia',
              position: 'right'
            }
          ],
          series: [
            {
              name: 'Mortalidad Neonatal Temprana',
              type: 'bar',
              data: response.map(item => item.total_neonatal_temprana),
              itemStyle: {
                color: (params: any) => {
                  const colors = [ '#73C0DE', '#EE6666', '#FAC858', '#91CC75'];
                  return colors[params.dataIndex % colors.length];
                }
              },
            },
            {
              name: 'Tendencia',
              type: 'line',
              yAxisIndex: 1,
              data: response.map(item => item.total_neonatal_temprana),
              smooth: true,
              itemStyle: {
                color: '#EE6666'
              }
            }
          ]
        };



        this.initChart('mortalidadNeoChart', this.chartOptionsMortalidad);
      },
      (err) => {
        console.log('Error al obtener los datos:', err);
      }
    );
  }


  getConsultasIve() {
    this.dashboardService.getIveProportion(this.user.rol_id, this.user.userable.cod_ips).subscribe(
      (response) => {
        console.log('consultas IVE', response);

        // Mapear los datos para la gráfica
        const chartData = response.map(item => ({
          mes: item.mes,
          totalMujeres: item.total_mujeres,
          asesoriasIve: item.mujeres_asesoria_ive,
          proporcionIve: parseFloat(item.proporcion_ive) // Convertir a número si es necesario
        }));

        // Configuración del gráfico
        this.chartOptionsConsultasIve = {
          title: {
            text: 'Consultas IVE',
            left: 'center'
          },
          dataset: {
            source: [
              ['Mes', 'Total Mujeres', 'Asesorías IVE', 'Proporción IVE'], // Encabezados
              ...chartData.map(row => [
                row.mes,
                row.totalMujeres,
                row.asesoriasIve,
                row.proporcionIve
              ])
            ]
          },
          grid: { containLabel: true },
          xAxis: { name: 'Valores', type: 'value' }, // Valores en el eje X
          yAxis: { name: 'Meses', type: 'category' }, // Meses en el eje Y
          series: [
            {
              type: 'bar',
              name: 'Total Mujeres',
              encode: { y: 'Mes', x: 'Total Mujeres' } // Invertir x e y para barras horizontales
            },
            {
              type: 'bar',
              name: 'Asesorías IVE',
              encode: { y: 'Mes', x: 'Asesorías IVE' } // Invertir x e y
            },
            {
              type: 'line',
              name: 'Proporción IVE',
              encode: { y: 'Mes', x: 'Proporción IVE' },
              xAxisIndex: 0, // Usar el mismo eje X
              smooth: true // Línea suavizada
            }
          ]
        };

        // Inicializar el gráfico
        this.initChart('consultasIveChart', this.chartOptionsConsultasIve);
      },
      (err) => {
        console.log(err);
      }
    );
  }





  initChart(chartId: string, chartOptions: any): void {
    const chartDom = document.getElementById(chartId) as HTMLElement;

    if (!chartDom) {
      console.error(`No se encontró el contenedor del gráfico con ID: ${chartId}`);
      return;
    }

    const chartInstance = echarts.init(chartDom); // Inicializa el gráfico en el contenedor

    if (chartOptions) {
      chartInstance.setOption(chartOptions); // Aplica las opciones si están definidas
    } else {
      console.error(`No se encontraron opciones para el gráfico con ID: ${chartId}`);
    }

    // Si necesitas mantener la instancia para actualizaciones futuras
    this.chartInstances = this.chartInstances || {}; // Asegúrate de inicializar el objeto si no existe
    this.chartInstances[chartId] = chartInstance; // Guarda la instancia por ID del gráfico
  }

}
