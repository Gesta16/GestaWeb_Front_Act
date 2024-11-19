export class TamizacionNeonatal {
    cod_tamizacion: number;
    id_usuario: number;
    cod_hemoclasifi: number;
    fec_tsh: string;
    resul_tsh: string;
    fec_pruetrepo: string;
    pruetreponemica: string;
    tamiza_aud: string;
    tamiza_cardi: string;
    tamiza_visual: string;
    num_proceso: number;
    reali_prueb_no_trepo_recien_nacido: boolean;
    reali_tamiza_auditivo: boolean;
    reali_tamiza_cardiopatia_conge: boolean;
    reali_tamiza_visual: boolean;

    constructor(
        {
            cod_tamizacion = 0,
            id_usuario = 0,
            cod_hemoclasifi = 0,
            fec_tsh = '',
            resul_tsh = '',
            fec_pruetrepo = '',
            pruetreponemica = '',
            tamiza_aud = '',
            tamiza_cardi = '',
            tamiza_visual = '',
            num_proceso = 0,
            reali_prueb_no_trepo_recien_nacido = false,
            reali_tamiza_auditivo = false,
            reali_tamiza_cardiopatia_conge = false,
            reali_tamiza_visual = false,
        }: {
            cod_tamizacion?: number,
            id_usuario?: number,
            cod_hemoclasifi?: number,
            fec_tsh?: string,
            resul_tsh?: string,
            fec_pruetrepo?: string,
            pruetreponemica?: string,
            tamiza_aud?: string,
            tamiza_cardi?: string,
            tamiza_visual?: string,
            num_proceso?: number,
            reali_prueb_no_trepo_recien_nacido?: boolean,
            reali_tamiza_auditivo?: boolean,
            reali_tamiza_cardiopatia_conge?: boolean,
            reali_tamiza_visual?: boolean,
        } = {}) {
        this.cod_tamizacion = cod_tamizacion;
        this.id_usuario = id_usuario;
        this.cod_hemoclasifi = cod_hemoclasifi;
        this.fec_tsh = fec_tsh;
        this.resul_tsh = resul_tsh;
        this.fec_pruetrepo = fec_pruetrepo;
        this.pruetreponemica = pruetreponemica;
        this.tamiza_aud = tamiza_aud;
        this.tamiza_cardi = tamiza_cardi;
        this.tamiza_visual = tamiza_visual;
        this.num_proceso = num_proceso;
        this.reali_prueb_no_trepo_recien_nacido = reali_prueb_no_trepo_recien_nacido
        this.reali_tamiza_auditivo = reali_tamiza_auditivo
        this.reali_tamiza_cardiopatia_conge = reali_tamiza_cardiopatia_conge
        this.reali_tamiza_visual = reali_tamiza_visual
    }
}



