export class SeguimientoComplementario {
    cod_segcomplementario: number;
    id_usuario: number;
    cod_sesiones: number;
    fec_nutricion: string;
    fec_ginecologia: string;
    fec_psicologia: string;
    fec_odontologia: string;
    ina_seguimiento: string;
    cau_inasistencia: string;
    num_proceso: number;
    asistio_nutricionista: boolean;
    asistio_ginecologia: boolean;
    asistio_psicologia: boolean;
    asistio_odontologia: boolean;

    constructor(
        { cod_segcomplementario = 0,
            id_usuario = 0,
            cod_sesiones = 0,
            fec_nutricion = '',
            fec_ginecologia = '',
            fec_psicologia = '',
            fec_odontologia = '',
            ina_seguimiento = '',
            cau_inasistencia = '',
            num_proceso = 0,
            asistio_nutricionista = false,
            asistio_ginecologia = false,
            asistio_psicologia = false,
            asistio_odontologia = false,
        }: {
            cod_segcomplementario?: number,
            id_usuario?: number,
            cod_sesiones?: number,
            fec_nutricion?: string,
            fec_ginecologia?: string,
            fec_psicologia?: string,
            fec_odontologia?: string,
            ina_seguimiento?: string,
            cau_inasistencia?: string,
            num_proceso?: number,
            asistio_nutricionista?: boolean,
            asistio_ginecologia?: boolean,
            asistio_psicologia?: boolean,
            asistio_odontologia?: boolean,
        } = {}) {
        this.cod_segcomplementario = cod_segcomplementario;
        this.id_usuario = id_usuario
        this.cod_sesiones = cod_sesiones;
        this.fec_nutricion = fec_nutricion;
        this.fec_ginecologia = fec_ginecologia;
        this.fec_psicologia = fec_psicologia;
        this.fec_odontologia = fec_odontologia;
        this.ina_seguimiento = ina_seguimiento;
        this.cau_inasistencia = cau_inasistencia;
        this.num_proceso = num_proceso;
        this.asistio_nutricionista = asistio_nutricionista
        this.asistio_ginecologia = asistio_ginecologia
        this.asistio_psicologia = asistio_psicologia
        this.asistio_odontologia = asistio_odontologia
    }
}
