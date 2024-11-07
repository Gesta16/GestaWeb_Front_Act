export class LaboratorioIIITrimestre {
    cod_treslaboratorio?: number;
    id_operador: number;
    id_usuario: number;
    hemograma: string;
    fec_hemograma: string;
    pru_vih: string;
    fec_vih: string;
    pru_sifilis: string;
    fec_sifilis: string;
    ig_toxoplasma: string;
    fec_toxoplasma: string;
    cul_rectal: string;
    fec_rectal: string;
    fec_biofisico: string;
    edad_gestacional: string;
    rie_biopsicosocial: string;
    num_proceso: number;


    constructor({
        id_operador = 0,
        id_usuario = 0,
        hemograma = '',
        fec_hemograma = '',
        pru_vih = '',
        fec_vih = '',
        pru_sifilis = '',
        fec_sifilis = '',
        ig_toxoplasma = '',
        fec_toxoplasma = '',
        cul_rectal = '',
        fec_rectal = '',
        fec_biofisico = '',
        edad_gestacional = '',
        rie_biopsicosocial = '',
        num_proceso = 0
    }: {
        cod_treslaboratorio?: number,
        id_operador?: number,
        id_usuario?: number,
        hemograma?: string,
        fec_hemograma?: string,
        pru_vih?: string,
        fec_vih?: string,
        pru_sifilis?: string,
        fec_sifilis?: string,
        ig_toxoplasma?: string,
        fec_toxoplasma?: string,
        cul_rectal?: string,
        fec_rectal?: string,
        fec_biofisico?: string,
        edad_gestacional?: string,
        rie_biopsicosocial?: string,
        num_proceso?: number
    } = {}) {
        this.cod_treslaboratorio = this.cod_treslaboratorio;
        this.id_operador = id_operador;
        this.id_usuario = id_usuario;
        this.hemograma = hemograma;
        this.fec_hemograma = fec_hemograma;
        this.pru_vih = pru_vih;
        this.fec_vih = fec_vih;
        this.pru_sifilis = pru_sifilis;
        this.fec_sifilis = fec_sifilis;
        this.ig_toxoplasma = ig_toxoplasma;
        this.fec_toxoplasma = fec_toxoplasma;
        this.cul_rectal = cul_rectal;
        this.fec_rectal = fec_rectal;
        this.fec_biofisico = fec_biofisico;
        this.edad_gestacional = edad_gestacional;
        this.rie_biopsicosocial = rie_biopsicosocial;
        this.num_proceso = num_proceso
    }
}
