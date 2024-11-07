export class SeguimientoConsultaMensual {
    cod_seguimiento: number;
    id_usuario: number;
    cod_riesgo: number;
    cod_controles: number;
    cod_diagnostico: number;
    cod_medicion: number;
    fec_consulta: string;
    edad_gestacional: string;
    alt_uterina: string;
    trim_gestacional: number;
    peso: string;
    talla: string;
    imc: string;
    ten_arts: string;
    ten_artd: string;
    num_proceso: number;


    constructor({
        cod_seguimiento = 0,
        id_usuario = 0,
        cod_riesgo = 0,
        cod_controles = 0,
        cod_diagnostico = 0,
        cod_medicion = 0,
        fec_consulta = '',
        edad_gestacional = '',
        alt_uterina = '',
        trim_gestacional = 0,
        peso = '',
        talla = '',
        imc = '',
        ten_arts = '',
        ten_artd = '',
        num_proceso = 0,
    }: {
        cod_seguimiento?: number,
        id_usuario?: number,
        cod_riesgo?: number,
        cod_controles?: number,
        cod_diagnostico?: number,
        cod_medicion?: number,
        fec_consulta?: string,
        edad_gestacional?: string,
        alt_uterina?: string,
        trim_gestacional?: number,
        peso?: string,
        talla?: string,
        imc?: string,
        ten_arts?: string,
        ten_artd?: string,
        num_proceso?: number
    } = {}) {
        this.cod_seguimiento = cod_seguimiento;
        this.id_usuario = id_usuario;
        this.cod_riesgo = cod_riesgo;
        this.cod_controles = cod_controles;
        this.cod_diagnostico = cod_diagnostico;
        this.cod_medicion = cod_medicion;
        this.fec_consulta = fec_consulta;
        this.edad_gestacional = edad_gestacional;
        this.alt_uterina = alt_uterina;
        this.trim_gestacional = trim_gestacional;
        this.peso = peso;
        this.talla = talla;
        this.imc = imc;
        this.ten_arts = ten_arts;
        this.ten_artd = ten_artd;
        this.num_proceso = num_proceso;
    }
}
