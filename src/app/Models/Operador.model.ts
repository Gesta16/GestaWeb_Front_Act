export class Operador {
    id_operador: number;
    id_admin: number;
    cod_ips: number;
    nom_operador: string;
    ape_operador: string;
    tel_operador: string;
    email_operador: string;
    esp_operador: string;
    cod_documento: number;
    documento_operador: string;
    cod_departamento: number;
    cod_municipio: number;

    constructor({
        id_operador = 0,
        id_admin = 0,
        cod_ips = 0,
        nom_operador = '',
        ape_operador = '',
        tel_operador = '',
        email_operador = '',
        esp_operador = '',
        cod_documento = 0,
        documento_operador = '',
        cod_departamento = 0,
        cod_municipio = 0,
    }: Partial<Operador> = {}) {
        this.id_operador = id_operador;
        this.id_admin = id_admin;
        this.cod_ips = cod_ips;
        this.nom_operador = nom_operador;
        this.ape_operador = ape_operador;
        this.tel_operador = tel_operador;
        this.email_operador = email_operador;
        this.esp_operador = esp_operador;
        this.cod_documento = cod_documento;
        this.documento_operador = documento_operador;
        this.cod_departamento = cod_departamento;
        this.cod_municipio = cod_municipio;
    }

    // Método para asignar cod_ips dinámicamente
    setCodIps(cod_ips: number): void {
        this.cod_ips = cod_ips;
    }
}
