export class PrimeraConsulta {
    cod_consulta?: number;
    id_operador?: number;
    id_usuario?: number;
    cod_riesgo: number;
    cod_dm?: number | null;
    peso_previo: string;
    tal_consulta: string;
    imc_consulta: string;
    diag_nutricional: string;
    hta: string;
    dm: string;
    fact_riesgo: string;
    expo_violencia: boolean;
    ries_depresion: boolean;
    for_gestacion: string;
    for_parto: string;
    for_cesarea: string;
    for_aborto: string;
    fec_lactancia?: Date | null;
    fec_consejeria?: Date | null;
    num_proceso: number;
    asis_conse_lactancia:boolean;
    asis_conse_pre_vih:boolean;

    constructor({

        cod_riesgo = 0,
        cod_dm = 0,
        peso_previo = '',
        tal_consulta = '',
        imc_consulta = '',
        diag_nutricional = '',
        hta = '',
        dm = '',
        fact_riesgo = '',
        expo_violencia = false,
        ries_depresion = false,
        for_gestacion = '',
        for_parto = '',
        for_cesarea = '',
        for_aborto = '',
        fec_lactancia = new Date(),
        fec_consejeria = new Date(),
        id_usuario = 0,
        num_proceso = 0,
        asis_conse_lactancia = false,
        asis_conse_pre_vih = false

    }: {
        id_operador?: number,
        id_usuario?: number,
        cod_riesgo?: number,
        cod_dm?: number,
        peso_previo?: string,
        tal_consulta?: string,
        imc_consulta?: string,
        diag_nutricional?: string,
        hta?: string,
        dm?: string,
        fact_riesgo?: string,
        expo_violencia?: boolean,
        ries_depresion?: boolean,
        for_gestacion?: string,
        for_parto?: string,
        for_cesarea?: string,
        for_aborto?: string,
        fec_lactancia?: Date,
        fec_consejeria?: Date,
        num_proceso?: number,
        asis_conse_lactancia?:boolean,
        asis_conse_pre_vih?:boolean
    } = {}) {

        this.id_operador = this.id_operador;
        this.id_usuario = id_usuario;
        this.cod_riesgo = cod_riesgo;
        this.cod_dm = cod_dm;
        this.peso_previo = peso_previo;
        this.tal_consulta = tal_consulta;
        this.imc_consulta = imc_consulta;
        this.diag_nutricional = diag_nutricional;
        this.hta = hta;
        this.dm = dm;
        this.fact_riesgo = fact_riesgo;
        this.expo_violencia = expo_violencia;
        this.ries_depresion = ries_depresion;
        this.for_gestacion = for_gestacion;
        this.for_parto = for_parto;
        this.for_cesarea = for_cesarea;
        this.for_aborto = for_aborto;
        this.fec_lactancia = fec_lactancia;
        this.fec_consejeria = fec_consejeria;
        this.num_proceso = num_proceso;
        this.asis_conse_lactancia = asis_conse_lactancia;
        this.asis_conse_pre_vih = asis_conse_pre_vih;
    }
}
