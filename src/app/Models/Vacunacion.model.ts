export class Vacunacion {
    cod_vacunacion?: number;
    id_operador?: number;
    id_usuario: number;
    cod_biologico: number;
    fec_unocovid: Date | null;
    fec_doscovid: Date | null;
    fec_refuerzo: Date | null;
    fec_influenza: Date | null;
    fec_tetanico: Date | null;
    fec_dpt: Date | null;
    recib_prim_dosis_covid19:boolean;
    recib_segu_dosis_covid19:boolean;
    recib_refu_covid19:boolean;
    recib_dosis_influenza:boolean;
    recib_dosis_tox_tetanico:boolean;
    recib_dosis_dpt_a_celular:boolean;

    constructor(
       { id_usuario = 0,
        cod_biologico = 0,
        fec_unocovid = new Date(),
        fec_doscovid = new Date(),
        fec_refuerzo = new Date(),
        fec_influenza = new Date,
        fec_tetanico = new Date(),
        fec_dpt = new Date(),
        recib_prim_dosis_covid19 = false,
        recib_segu_dosis_covid19 = false,
        recib_refu_covid19 = false,
        recib_dosis_influenza = false,
        recib_dosis_tox_tetanico = false,
        recib_dosis_dpt_a_celular = false,
    }:{
        cod_vacunacion?: number,
        id_operador?: number,
        id_usuario?: number,
        cod_biologico?: number,
        fec_unocovid?: Date | null,
        fec_doscovid?: Date | null,
        fec_refuerzo?: Date | null,
        fec_influenza?: Date | null,
        fec_tetanico?: Date | null,
        fec_dpt?: Date | null,
        recib_prim_dosis_covid19?:boolean,
        recib_segu_dosis_covid19?:boolean,
        recib_refu_covid19?:boolean,
        recib_dosis_influenza?:boolean,
        recib_dosis_tox_tetanico?:boolean,
        recib_dosis_dpt_a_celular?:boolean
    }={}) {
        this.cod_vacunacion = this.cod_vacunacion;
        this.id_operador = this.id_operador;
        this.id_usuario = id_usuario;
        this.cod_biologico = cod_biologico;
        this.fec_unocovid = fec_unocovid;
        this.fec_doscovid = fec_doscovid;
        this.fec_refuerzo = fec_refuerzo;
        this.fec_influenza = fec_influenza;
        this.fec_tetanico = fec_tetanico;
        this.fec_dpt = fec_dpt;
        this.recib_prim_dosis_covid19 = recib_prim_dosis_covid19;
        this.recib_segu_dosis_covid19 = recib_segu_dosis_covid19;
        this.recib_refu_covid19 = recib_refu_covid19;
        this.recib_dosis_influenza = recib_dosis_influenza;
        this.recib_dosis_tox_tetanico = recib_dosis_tox_tetanico;
        this.recib_dosis_dpt_a_celular = recib_dosis_dpt_a_celular;

    }


}
