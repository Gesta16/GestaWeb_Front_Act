export class RutaPYMS {
    cod_ruta: number;
    id_usuario: number;
    fec_bcg: string;
    fec_hepatitis: string;
    fec_seguimiento: string;
    fec_entrega: string;
    num_proceso: number;


    constructor(
        {
            cod_ruta = 0,
            id_usuario = 0,
            fec_bcg = '',
            fec_hepatitis = '',
            fec_seguimiento = '',
            fec_entrega = '',
            num_proceso = 0
        }: {
            cod_ruta?: number,
            id_usuario?: number,
            fec_bcg?: string,
            fec_hepatitis?: string,
            fec_seguimiento?: string,
            fec_entrega?: string,
            num_proceso?: number
        } = {}) {
        this.cod_ruta = cod_ruta;
        this.id_usuario = id_usuario;
        this.fec_bcg = fec_bcg;
        this.fec_hepatitis = fec_hepatitis;
        this.fec_seguimiento = fec_seguimiento;
        this.fec_entrega = fec_entrega;
        this.num_proceso = num_proceso;
    }
}

