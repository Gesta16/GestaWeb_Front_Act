export class Its {
    cod_its: number;
    id_operador: number;
    id_usuario: number;
    cod_vdrl: number;
    cod_rpr: number;
    eli_vih: string;
    fec_vih: Date;
    fec_vdrl: Date;
    fec_rpr: Date;
    rec_tratamiento: string;
    rec_pareja: string;
    num_proceso: number;


    constructor({
        cod_its = 0,
        id_operador = 0,
        id_usuario = 0,
        cod_vdrl = 0,
        cod_rpr = 0,
        eli_vih = '',
        fec_vih = new Date(),
        fec_vdrl = new Date(),
        fec_rpr = new Date(),
        rec_tratamiento = '',
        rec_pareja = '',
        num_proceso = 0
    }: {
        cod_its?: number,
        id_operador?: number,
        id_usuario?: number,
        cod_vdrl?: number,
        cod_rpr?: number,
        eli_vih?: string,
        fec_vih?: Date,
        fec_vdrl?: Date,
        fec_rpr?: Date,
        rec_tratamiento?: string,
        rec_pareja?: string,
        num_proceso?: number
    } = {}) {
        this.cod_its = cod_its;
        this.id_operador = id_operador;
        this.id_usuario = id_usuario;
        this.cod_vdrl = cod_vdrl;
        this.cod_rpr = cod_rpr;
        this.eli_vih = eli_vih;
        this.fec_vih = fec_vih;
        this.fec_vdrl = fec_vdrl;
        this.fec_rpr = fec_rpr;
        this.rec_tratamiento = rec_tratamiento;
        this.rec_pareja = rec_pareja;
        this.num_proceso = num_proceso;
    }
}