export class DatosRecienNacido {
    cod_recien: number;
    id_usuario: number;
    tip_embarazo: string;
    num_nacido: string;
    sexo: string;
    peso: string;
    talla: string;
    pla_canguro: string;
    ips_canguro: string;
    proceso_gestativo_id?: number;
    num_proceso: number;

    constructor(
        {
            cod_recien = 0,
            id_usuario = 0,
            tip_embarazo = '',
            num_nacido = '',
            sexo = '',
            peso = '',
            talla = '',
            pla_canguro = '',
            ips_canguro = '',
            num_proceso = 0,
        }: {
            cod_recien?: number,
            id_usuario?: number,
            tip_embarazo?: string,
            num_nacido?: string,
            sexo?: string,
            peso?: string,
            talla?: string,
            pla_canguro?: string,
            ips_canguro?: string,
            num_proceso?: number,
        } = {}) {
        this.cod_recien = cod_recien;
        this.id_usuario = id_usuario;
        this.tip_embarazo = tip_embarazo;
        this.num_nacido = num_nacido;
        this.sexo = sexo;
        this.peso = peso;
        this.talla = talla;
        this.pla_canguro = pla_canguro;
        this.ips_canguro = ips_canguro;
        this.num_proceso = num_proceso;
    }
}

