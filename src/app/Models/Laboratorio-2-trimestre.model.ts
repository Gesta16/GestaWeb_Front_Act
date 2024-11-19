export class LaboratorioIITrimestre {
    cod_doslaboratorio: number;
    id_operador: number;
    id_usuario: number;
    pru_vih: string;
    fec_vih: string;
    pru_sifilis: string;
    fec_sifilis: string;
    pru_oral: string;
    pru_uno: string;
    pru_dos: string;
    fec_prueba: string;
    rep_citologia: string;
    fec_citologia: string;
    ig_toxoplasma: string;
    fec_toxoplasma: string;
    pru_avidez: string;
    fec_avidez: string;
    tox_laboratorio: string;
    fec_toxoplasmosis: string;
    hem_gruesa: string;
    fec_hemoparasito: string;
    coo_cualitativo: string;
    fec_coombs: string;
    fec_ecografia: string;
    eda_gestacional: string;
    rie_biopsicosocial: string;
    num_proceso: number;
    reali_prueb_rapi_vih: boolean;
    reali_prueb_trepo_rap_sifilis: boolean;
    reali_citologia: boolean;
    reali_prueb_avidez_igg: boolean;
    reali_prueb_toxopla_iga: boolean;
    reali_prueb_hemoparasito: boolean;
    reali_prueb_coombis_indi_cuanti: boolean;
    reali_eco_obste_deta_anatomico: boolean;

    constructor({
        cod_doslaboratorio = 0,
        id_operador = 0,
        id_usuario = 0,
        pru_vih = '',
        fec_vih = '',
        pru_sifilis = '',
        fec_sifilis = '',
        pru_oral = '',
        pru_uno = '',
        pru_dos = '',
        fec_prueba = '',
        rep_citologia = '',
        fec_citologia = '',
        ig_toxoplasma = '',
        fec_toxoplasma = '',
        pru_avidez = '',
        fec_avidez = '',
        tox_laboratorio = '',
        fec_toxoplasmosis = '',
        hem_gruesa = '',
        fec_hemoparasito = '',
        coo_cualitativo = '',
        fec_coombs = '',
        fec_ecografia = '',
        eda_gestacional = '',
        rie_biopsicosocial = '',
        num_proceso = 0,
        reali_prueb_rapi_vih = false,
        reali_prueb_trepo_rap_sifilis = false,
        reali_citologia = false,
        reali_prueb_avidez_igg = false,
        reali_prueb_toxopla_iga = false,
        reali_prueb_hemoparasito = false,
        reali_prueb_coombis_indi_cuanti = false,
        reali_eco_obste_deta_anatomico = false,
    }: {
        cod_doslaboratorio?: number,
        id_operador?: number,
        id_usuario?: number,
        pru_vih?: string,
        fec_vih?: string,
        pru_sifilis?: string,
        fec_sifilis?: string,
        pru_oral?: string,
        pru_uno?: string,
        pru_dos?: string,
        fec_prueba?: string,
        rep_citologia?: string,
        fec_citologia?: string,
        ig_toxoplasma?: string,
        fec_toxoplasma?: string,
        pru_avidez?: string,
        fec_avidez?: string,
        tox_laboratorio?: string,
        fec_toxoplasmosis?: string,
        hem_gruesa?: string,
        fec_hemoparasito?: string,
        coo_cualitativo?: string,
        fec_coombs?: string,
        fec_ecografia?: string,
        eda_gestacional?: string,
        rie_biopsicosocial?: string,
        num_proceso?: number,
        reali_prueb_rapi_vih?: boolean,
        reali_prueb_trepo_rap_sifilis?: boolean,
        reali_citologia?: boolean,
        reali_prueb_avidez_igg?: boolean,
        reali_prueb_toxopla_iga?: boolean,
        reali_prueb_hemoparasito?: boolean,
        reali_prueb_coombis_indi_cuanti?: boolean,
        reali_eco_obste_deta_anatomico?: boolean,
    } = {}) {
        this.cod_doslaboratorio = cod_doslaboratorio;
        this.id_operador = id_operador;
        this.id_usuario = id_usuario;
        this.pru_vih = pru_vih;
        this.fec_vih = fec_vih;
        this.pru_sifilis = pru_sifilis;
        this.fec_sifilis = fec_sifilis;
        this.pru_oral = pru_oral;
        this.pru_uno = pru_uno;
        this.pru_dos = pru_dos;
        this.fec_prueba = fec_prueba;
        this.rep_citologia = rep_citologia;
        this.fec_citologia = fec_citologia;
        this.ig_toxoplasma = ig_toxoplasma;
        this.fec_toxoplasma = fec_toxoplasma;
        this.pru_avidez = pru_avidez;
        this.fec_avidez = fec_avidez;
        this.tox_laboratorio = tox_laboratorio;
        this.fec_toxoplasmosis = fec_toxoplasmosis;
        this.hem_gruesa = hem_gruesa;
        this.fec_hemoparasito = fec_hemoparasito;
        this.coo_cualitativo = coo_cualitativo;
        this.fec_coombs = fec_coombs;
        this.fec_ecografia = fec_ecografia;
        this.eda_gestacional = eda_gestacional;
        this.rie_biopsicosocial = rie_biopsicosocial;
        this.num_proceso = num_proceso;
        this.reali_prueb_rapi_vih = reali_prueb_rapi_vih
        this.reali_prueb_trepo_rap_sifilis = reali_prueb_trepo_rap_sifilis
        this.reali_citologia = reali_citologia
        this.reali_prueb_avidez_igg = reali_prueb_avidez_igg
        this.reali_prueb_toxopla_iga = reali_prueb_toxopla_iga
        this.reali_prueb_hemoparasito = reali_prueb_hemoparasito
        this.reali_prueb_coombis_indi_cuanti = reali_prueb_coombis_indi_cuanti
        this.reali_eco_obste_deta_anatomico = reali_eco_obste_deta_anatomico

    }
}
