export class LaboratorioIntraparto {
    cod_intraparto: number;
    id_usuario: number;
    cod_vdrl: number;
    pru_sifilis: string;
    fec_sifilis: string;
    fec_vdrl: string;
    rec_sifilis: string;
    fec_tratamiento: string;
    pru_vih: string;
    fec_vih: string;
    num_proceso: number;
    reali_prueb_trepo_rapi_sifilis_intra: boolean;
    reali_prueb_no_trepo_vdrl_sifilis_intra: boolean;
    reali_prueb_rapi_vih: boolean;

    constructor(
        {
            cod_intraparto = 0,
            id_usuario = 0,
            cod_vdrl = 0,
            pru_sifilis = '',
            fec_sifilis = '',
            fec_vdrl = '',
            rec_sifilis = '',
            fec_tratamiento = '',
            pru_vih = '',
            fec_vih = '',
            num_proceso = 0,
            reali_prueb_trepo_rapi_sifilis_intra = false,
            reali_prueb_no_trepo_vdrl_sifilis_intra = false,
            reali_prueb_rapi_vih = false,
        }: {
            cod_intraparto?: number,
            id_usuario?: number,
            cod_vdrl?: number,
            pru_sifilis?: string,
            fec_sifilis?: string,
            fec_vdrl?: string,
            rec_sifilis?: string,
            fec_tratamiento?: string,
            pru_vih?: string,
            fec_vih?: string,
            num_proceso?: number,
            reali_prueb_trepo_rapi_sifilis_intra?: boolean,
            reali_prueb_no_trepo_vdrl_sifilis_intra?: boolean,
            reali_prueb_rapi_vih?: boolean,
        } = {}) {
        this.cod_intraparto = cod_intraparto;
        this.id_usuario = id_usuario;
        this.cod_vdrl = cod_vdrl;
        this.pru_sifilis = pru_sifilis;
        this.fec_sifilis = fec_sifilis;
        this.fec_vdrl = fec_vdrl;
        this.rec_sifilis = rec_sifilis;
        this.fec_tratamiento = fec_tratamiento;
        this.pru_vih = pru_vih;
        this.fec_vih = fec_vih;
        this.num_proceso = num_proceso;
        this.reali_prueb_trepo_rapi_sifilis_intra = reali_prueb_trepo_rapi_sifilis_intra
        this.reali_prueb_no_trepo_vdrl_sifilis_intra = reali_prueb_no_trepo_vdrl_sifilis_intra
        this.reali_prueb_rapi_vih = reali_prueb_rapi_vih
    }
}
