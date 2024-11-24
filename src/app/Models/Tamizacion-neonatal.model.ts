export class TamizacionNeonatal {
    cod_tamizacion: number;
    id_usuario: number;
    cod_hemoclasifi: number;
    fec_tsh: string;
    resul_tsh: string;
    fec_pruetrepo?: string |null;
    pruetreponemica?: string |null;
    tamiza_aud?: string |null;
    tamiza_cardi?: string |null;
    tamiza_visual?: string |null;
    num_proceso: number;
    reali_prueb_trepo_recien_nacido: boolean;
    reali_tami_auditivo: boolean;
    reali_tami_cardiopatia_congenita: boolean;
    reali_tami_visual: boolean;

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
            reali_prueb_trepo_recien_nacido = false,
            reali_tami_auditivo = false,
            reali_tami_cardiopatia_congenita = false,
            reali_tami_visual = false,
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
            reali_prueb_trepo_recien_nacido?: boolean,
            reali_tami_auditivo?: boolean,
            reali_tami_cardiopatia_congenita?: boolean,
            reali_tami_visual?: boolean,
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
        this.reali_prueb_trepo_recien_nacido = reali_prueb_trepo_recien_nacido
        this.reali_tami_auditivo = reali_tami_auditivo
        this.reali_tami_cardiopatia_congenita = reali_tami_cardiopatia_congenita
        this.reali_tami_visual = reali_tami_visual
    }
}



