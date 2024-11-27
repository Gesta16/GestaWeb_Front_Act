export class Its {
    cod_its: number;
    id_operador: number;
    id_usuario: number;
    cod_vdrl: number;
    cod_rpr?: number | null;
    eli_vih?: string | null;
    fec_vih?: Date | null;
    fec_vdrl?: Date | null;
    fec_rpr?: Date | null;
    rec_tratamiento?: string | null;
    rec_pareja?: string | null;
    num_proceso: number;
    reali_prueb_elisa_vih: boolean;
    reali_prueb_no_trepo_vdrl_sifilis: boolean;
    reali_prueb_no_trepo_rpr_sifilis: boolean;

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
        num_proceso = 0,
        reali_prueb_elisa_vih = false,
        reali_prueb_no_trepo_vdrl_sifilis = false,
        reali_prueb_no_trepo_rpr_sifilis = false,
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
        num_proceso?: number,
        reali_prueb_elisa_vih?: boolean,
        reali_prueb_no_trepo_vdrl_sifilis?: boolean,
        reali_prueb_no_trepo_rpr_sifilis?: boolean,
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
        this.reali_prueb_elisa_vih = reali_prueb_elisa_vih
        this.reali_prueb_no_trepo_vdrl_sifilis = reali_prueb_no_trepo_vdrl_sifilis
        this.reali_prueb_no_trepo_rpr_sifilis = reali_prueb_no_trepo_rpr_sifilis
    }
}