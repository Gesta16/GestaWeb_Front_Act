export class LaboratorioITrimestre {
    cod_laboratorio: number;
    id_operador: number;
    id_usuario: number;
    cod_hemoclasifi: number;
    cod_antibiograma: number;
    fec_hemoclasificacion: string;
    hem_laboratorio: string;
    fec_hemograma: string;
    gli_laboratorio: string;
    fec_glicemia: string;
    ant_laboratorio: string;
    fec_antigeno: string;
    pru_vih: string;
    fec_vih: string;
    pru_sifilis: string;
    fec_sifilis: string;
    uro_laboratorio: string;
    fec_urocultivo: string;
    fec_antibiograma: string;
    ig_rubeola: string;
    fec_rubeola: string;
    ig_toxoplasma: string;
    fec_toxoplasma: string;
    hem_gruesa: string;
    fec_hemoparasito: string;
    pru_antigenos: string;
    fec_antigenos: string;
    eli_recombinante: string;
    fec_recombinante: string;
    coo_cuantitativo: string;
    fec_coombs: string;
    fec_ecografia: string;
    eda_gestacional: string;
    rie_biopsicosocial: string;
    num_proceso: number;
    reali_prueb_rapi_vih:boolean;
    reali_prueb_trepo_sifilis:boolean;
    reali_urocultivo:boolean;
    reali_antibiograma:boolean;
    reali_prueb_eliza_anti_tot:boolean;
    reali_prueb_elisa_anti_recom:boolean;
    reali_prueb_coombi_indi:boolean;
    reali_eco_obste_tami:boolean;

    constructor({
        cod_laboratorio = 0,
        id_operador = 0,
        id_usuario = 0,
        cod_hemoclasifi = 0,
        cod_antibiograma = 0,
        fec_hemoclasificacion = '',
        hem_laboratorio = '',
        fec_hemograma = '',
        gli_laboratorio = '',
        fec_glicemia = '',
        ant_laboratorio = '',
        fec_antigeno = '',
        pru_vih = '',
        fec_vih = '',
        pru_sifilis = '',
        fec_sifilis = '',
        uro_laboratorio = '',
        fec_urocultivo = '',
        fec_antibiograma = '',
        ig_rubeola = '',
        fec_rubeola = '',
        ig_toxoplasma = '',
        fec_toxoplasma = '',
        hem_gruesa = '',
        fec_hemoparasito = '',
        pru_antigenos = '',
        fec_antigenos = '',
        eli_recombinante = '',
        fec_recombinante = '',
        coo_cuantitativo = '',
        fec_coombs = '',
        fec_ecografia = '',
        eda_gestacional = '',
        rie_biopsicosocial = '',
        num_proceso = 0,
        reali_prueb_rapi_vih=false,
        reali_prueb_trepo_sifilis=false,
        reali_urocultivo=false,
        reali_antibiograma=false,
        reali_prueb_eliza_anti_tot=false,
        reali_prueb_elisa_anti_recom=false,
        reali_prueb_coombi_indi=false,
        reali_eco_obste_tami=false,
    }: {
        cod_laboratorio?: number,
        id_operador?: number,
        id_usuario?: number,
        cod_hemoclasifi?: number,
        cod_antibiograma?: number,
        fec_hemoclasificacion?: string,
        hem_laboratorio?: string,
        fec_hemograma?: string,
        gli_laboratorio?: string,
        fec_glicemia?: string,
        ant_laboratorio?: string,
        fec_antigeno?: string,
        pru_vih?: string,
        fec_vih?: string,
        pru_sifilis?: string,
        fec_sifilis?: string,
        uro_laboratorio?: string,
        fec_urocultivo?: string,
        fec_antibiograma?: string,
        ig_rubeola?: string,
        fec_rubeola?: string,
        ig_toxoplasma?: string,
        fec_toxoplasma?: string,
        hem_gruesa?: string,
        fec_hemoparasito?: string,
        pru_antigenos?: string,
        fec_antigenos?: string,
        eli_recombinante?: string,
        fec_recombinante?: string,
        coo_cuantitativo?: string,
        fec_coombs?: string,
        fec_ecografia?: string,
        eda_gestacional?: string,
        rie_biopsicosocial?: string,
        num_proceso?: number,
        reali_prueb_rapi_vih?:boolean,
        reali_prueb_trepo_sifilis?:boolean,
        reali_urocultivo?:boolean,
        reali_antibiograma?:boolean,
        reali_prueb_eliza_anti_tot?:boolean,
        reali_prueb_elisa_anti_recom?:boolean,
        reali_prueb_coombi_indi?:boolean,
        reali_eco_obste_tami?:boolean,
        
    } = {}) {
        this.cod_laboratorio = cod_laboratorio;
        this.id_operador = id_operador;
        this.id_usuario = id_usuario;
        this.cod_hemoclasifi = cod_hemoclasifi;
        this.cod_antibiograma = cod_antibiograma;
        this.fec_hemoclasificacion = fec_hemoclasificacion;
        this.hem_laboratorio = hem_laboratorio;
        this.fec_hemograma = fec_hemograma;
        this.gli_laboratorio = gli_laboratorio;
        this.fec_glicemia = fec_glicemia;
        this.ant_laboratorio = ant_laboratorio;
        this.fec_antigeno = fec_antigeno;
        this.pru_vih = pru_vih;
        this.fec_vih = fec_vih;
        this.pru_sifilis = pru_sifilis;
        this.fec_sifilis = fec_sifilis;
        this.uro_laboratorio = uro_laboratorio;
        this.fec_urocultivo = fec_urocultivo;
        this.fec_antibiograma = fec_antibiograma;
        this.ig_rubeola = ig_rubeola;
        this.fec_rubeola = fec_rubeola;
        this.ig_toxoplasma = ig_toxoplasma;
        this.fec_toxoplasma = fec_toxoplasma;
        this.hem_gruesa = hem_gruesa;
        this.fec_hemoparasito = fec_hemoparasito;
        this.pru_antigenos = pru_antigenos;
        this.fec_antigenos = fec_antigenos;
        this.eli_recombinante = eli_recombinante;
        this.fec_recombinante = fec_recombinante;
        this.coo_cuantitativo = coo_cuantitativo;
        this.fec_coombs = fec_coombs;
        this.fec_ecografia = fec_ecografia;
        this.eda_gestacional = eda_gestacional;
        this.rie_biopsicosocial = rie_biopsicosocial;
        this.num_proceso = num_proceso;
        this.reali_prueb_rapi_vih =reali_prueb_rapi_vih;
        this.reali_prueb_trepo_sifilis = reali_prueb_trepo_sifilis;
        this.reali_urocultivo = reali_urocultivo;
        this.reali_antibiograma = reali_antibiograma;
        this.reali_prueb_eliza_anti_tot = reali_prueb_eliza_anti_tot;
        this.reali_prueb_elisa_anti_recom = reali_prueb_elisa_anti_recom;
        this.reali_prueb_coombi_indi = reali_prueb_coombi_indi;
        this.reali_eco_obste_tami = reali_eco_obste_tami;

    }
}
