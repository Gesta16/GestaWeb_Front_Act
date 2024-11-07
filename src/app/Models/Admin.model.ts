export class Admin {
  id_admin: number;
  cod_ips: number;
  nom_admin: string;
  ape_admin: string;
  tel_admin: string;
  email_admin: string;
  cod_documento: number;
  documento_admin: string;
  cod_departamento: number;
  cod_municipio: number;

  constructor({
    id_admin = 0,
    cod_ips = 0,
    nom_admin = '',
    ape_admin = '',
    email_admin = '',
    tel_admin = '',
    cod_documento = 0,
    documento_admin = '',
    cod_departamento = 0,
    cod_municipio = 0,
  }: {
    id_admin?: number,
    cod_ips?: number,
    nom_admin?: string,
    ape_admin?: string,
    tel_admin?: string,
    email_admin?: string,
    cod_documento?: number,
    documento_admin?: string,
    cod_departamento?: number,
    cod_municipio?: number,
  } = {}) {
    this.id_admin = id_admin;
    this.cod_ips = cod_ips;
    this.nom_admin = nom_admin;
    this.ape_admin = ape_admin;
    this.tel_admin = tel_admin;
    this.email_admin = email_admin;
    this.cod_documento = cod_documento;
    this.documento_admin = documento_admin;
    this.cod_departamento = cod_departamento;
    this.cod_municipio = cod_municipio;
  }
}