export class SeguimientoPostObstetrico {
    cod_evento: number;
    id_usuario: number;
    cod_metodo: number;
    con_egreso: string;
    fec_fallecimiento: string;
    fec_planificacion: string;
    num_proceso: number;


    constructor(
        {
            cod_evento = 0,
            id_usuario = 0,
            cod_metodo = 0,
            con_egreso = '',
            fec_fallecimiento = '',
            fec_planificacion = '',
            num_proceso = 0
        }: {
            cod_evento?: number,
            id_usuario?: number,
            cod_metodo?: number,
            con_egreso?: string,
            fec_fallecimiento?: string,
            fec_planificacion?: string,
            num_proceso?: number
        } = {}) {
        this.cod_evento = cod_evento;
        this.id_usuario = id_usuario;
        this.cod_metodo = cod_metodo;
        this.con_egreso = con_egreso;
        this.fec_fallecimiento = fec_fallecimiento;
        this.fec_planificacion = fec_planificacion;
        this.num_proceso = num_proceso;
    }
}
