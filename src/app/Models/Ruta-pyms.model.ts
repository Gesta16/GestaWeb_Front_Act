export class RutaPYMS {
    cod_ruta: number;
    id_usuario: number;
    fec_bcg: string;
    fec_hepatitis: string;
    fec_seguimiento: string;
    fec_entrega: string;
    num_proceso: number;
    aplico_vacuna_bcg: boolean;
    aplico_vacuna_hepatitis: boolean;
    reali_entrega_carnet: boolean;

    constructor(
        {
            cod_ruta = 0,
            id_usuario = 0,
            fec_bcg = '',
            fec_hepatitis = '',
            fec_seguimiento = '',
            fec_entrega = '',
            num_proceso = 0,
            aplico_vacuna_bcg = false,
            aplico_vacuna_hepatitis = false,
            reali_entrega_carnet = false,
        }: {
            cod_ruta?: number,
            id_usuario?: number,
            fec_bcg?: string,
            fec_hepatitis?: string,
            fec_seguimiento?: string,
            fec_entrega?: string,
            num_proceso?: number,
            aplico_vacuna_bcg?: boolean,
            aplico_vacuna_hepatitis?: boolean,
            reali_entrega_carnet?: boolean,
        } = {}) {
        this.cod_ruta = cod_ruta;
        this.id_usuario = id_usuario;
        this.fec_bcg = fec_bcg;
        this.fec_hepatitis = fec_hepatitis;
        this.fec_seguimiento = fec_seguimiento;
        this.fec_entrega = fec_entrega;
        this.num_proceso = num_proceso;
        this.aplico_vacuna_bcg = aplico_vacuna_bcg;
        this.aplico_vacuna_hepatitis = aplico_vacuna_hepatitis;
        this.reali_entrega_carnet = reali_entrega_carnet;
    }
}

