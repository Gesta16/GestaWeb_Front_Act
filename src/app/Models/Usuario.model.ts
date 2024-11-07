export class Usuario {
    id_usuario: number;
    nom_usuario: string;
    ape_usuario: string;
    email_usuario: string;
    tel_usuario: string;
    cel_usuario: string;
    fec_nacimiento: string;
    edad_usuario: string;
    cod_documento: number;
    documento_usuario: string;
    fec_diag_usuario: string;
    fec_ingreso: string;
    cod_departamento: number;
    cod_municipio: number;
    cod_ips: number;
    cod_poblacion: number;
    dir_usuario: string;
    procesosCount?: number;

    constructor({
        id_usuario = 0,
        cod_ips = 0,
        nom_usuario = '',
        ape_usuario = '',
        email_usuario = '',
        tel_usuario = '',
        cel_usuario = '',
        dir_usuario = '',
        fec_nacimiento = '',
        edad_usuario = '',
        cod_documento = 0,
        documento_usuario = '',
        fec_diag_usuario = '',
        fec_ingreso = '',
        cod_departamento = 0,
        cod_municipio = 0,
        cod_poblacion = 0,
    }: {
        id_usuario?: number,
        nom_usuario?: string,
        ape_usuario?: string,
        email_usuario?: string,
        tel_usuario?: string,
        cel_usuario?: string,
        fec_nacimiento?: string,
        edad_usuario?: string,
        cod_documento?: number,
        documento_usuario?: string,
        fec_diag_usuario?: string,
        fec_ingreso?: string,
        cod_departamento?: number,
        cod_municipio?: number,
        cod_ips?: number,
        cod_poblacion?: number,
        dir_usuario?: string,
    } = {}) {
        this.id_usuario = id_usuario;
        this.nom_usuario = nom_usuario;
        this.ape_usuario = ape_usuario;
        this.email_usuario = email_usuario;
        this.tel_usuario = tel_usuario;
        this.cel_usuario = cel_usuario;
        this.fec_nacimiento = fec_nacimiento;
        this.edad_usuario = edad_usuario;
        this.cod_documento = cod_documento;
        this.documento_usuario = documento_usuario;
        this.fec_diag_usuario = fec_diag_usuario;
        this.fec_ingreso = fec_ingreso;
        this.cod_departamento = cod_departamento;
        this.cod_municipio = cod_municipio;
        this.cod_ips = cod_ips;
        this.cod_poblacion = cod_poblacion;
        this.dir_usuario = dir_usuario;

    }

}
