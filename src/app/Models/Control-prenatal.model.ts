export class ControlPrenatal {
    cod_control?: number;
    id_operador?: number;
    id_usuario?: number;
    cod_fracaso?: number | null;
    edad_gestacional: string;
    trim_ingreso: string;
    fec_mestruacion: Date;
    fec_parto: Date;
    emb_planeado: boolean;
    fec_anticonceptivo: boolean;
    fec_consulta?: Date | null;
    fec_control?: Date | null;
    ries_reproductivo: string;
    fac_asesoria: Date;
    usu_solicito: boolean;
    fec_terminacion?: Date | null;
    per_intergenesico: boolean;
    num_proceso: number;
    recibio_atencion_preconcep:boolean;
    asis_consul_control_precon:boolean;
    asis_asesoria_ive?:boolean | null;
    tuvo_embarazos_antes:boolean;

    constructor({
        cod_control = 0,
        id_operador = 0,
        id_usuario = 0,
        cod_fracaso = 0,
        edad_gestacional = '',
        trim_ingreso = '',
        fec_mestruacion = new Date(),
        fec_parto = new Date(),
        emb_planeado = false,
        fec_anticonceptivo = false,
        fec_consulta = new Date(),
        fec_control = new Date(),
        ries_reproductivo = '',
        fac_asesoria = new Date(),
        usu_solicito = false,
        fec_terminacion = new Date(),
        per_intergenesico = false,
        num_proceso = 0,
        recibio_atencion_preconcep = false,
        asis_consul_control_precon = false,
        asis_asesoria_ive = false,
        tuvo_embarazos_antes = false
    }: {
        cod_control?: number,
        id_operador?: number,
        id_usuario?: number,
        cod_fracaso?: number,
        edad_gestacional?: string,
        trim_ingreso?: string,
        fec_mestruacion?: Date,
        fec_parto?: Date,
        emb_planeado?: boolean,
        fec_anticonceptivo?: boolean,
        fec_consulta?: Date,
        fec_control?: Date,
        ries_reproductivo?: string,
        fac_asesoria?: Date,
        usu_solicito?: boolean,
        fec_terminacion?: Date,
        per_intergenesico?: boolean,
        num_proceso?: number,
        recibio_atencion_preconcep?:boolean,
        asis_consul_control_precon?:boolean,
        asis_asesoria_ive?:boolean,
        tuvo_embarazos_antes?:boolean
    }={}) {
        this.cod_control = cod_control;
        this.id_operador = id_operador;
        this.id_usuario = id_usuario;
        this.cod_fracaso = cod_fracaso;
        this.edad_gestacional = edad_gestacional;
        this.trim_ingreso = trim_ingreso;
        this.fec_mestruacion = fec_mestruacion;
        this.fec_parto = fec_parto;
        this.emb_planeado = emb_planeado;
        this.fec_anticonceptivo = fec_anticonceptivo;
        this.fec_consulta = fec_consulta;
        this.fec_control = fec_control;
        this.ries_reproductivo = ries_reproductivo;
        this.fac_asesoria = fac_asesoria;
        this.usu_solicito = usu_solicito;
        this.fec_terminacion = fec_terminacion;
        this.per_intergenesico = per_intergenesico;
        this.num_proceso = num_proceso;
        this.recibio_atencion_preconcep = recibio_atencion_preconcep;
        this.asis_consul_control_precon = asis_consul_control_precon;
        this.asis_asesoria_ive = asis_asesoria_ive;
        this.tuvo_embarazos_antes = tuvo_embarazos_antes;
    }
}
