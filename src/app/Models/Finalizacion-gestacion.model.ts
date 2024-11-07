export class FinalizacionGestacion {
    cod_finalizacion: number;
    id_usuario: number;
    cod_terminacion: number;
    fec_evento: string;
    num_proceso: number;


    constructor(
        {
            cod_finalizacion = 0,
            id_usuario = 0,
            cod_terminacion = 0,
            fec_evento = '',
            num_proceso = 0
        }: {
            cod_finalizacion?: number,
            id_usuario?: number,
            cod_terminacion?: number,
            fec_evento?: string,
            num_proceso?: number
        } = {}) {
        this.cod_finalizacion = cod_finalizacion;
        this.id_usuario = id_usuario;
        this.cod_terminacion = cod_terminacion;
        this.fec_evento = fec_evento;
        this.num_proceso = num_proceso;
    }
}
