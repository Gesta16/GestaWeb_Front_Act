export class Ips {
    cod_ips: number;
    cod_regimen: number; 
    cod_departamento: number; 
    nom_ips: string; 
    dir_ips: string; 
    tel_ips: string; 
    email_ips: string;
    nit_ips: string; 
    cod_municipio: number;
  
    constructor(
      cod_ips: number,
      cod_regimen: number,
      cod_departamento: number,
      nom_ips: string,
      dir_ips: string,
      tel_ips: string,
      email_ips: string,
      nit_ips: string,
      cod_municipio: number
    ) {
      this.cod_ips = cod_ips;
      this.cod_regimen = cod_regimen;
      this.cod_departamento = cod_departamento;
      this.nom_ips = nom_ips;
      this.dir_ips = dir_ips;
      this.tel_ips = tel_ips;
      this.email_ips = email_ips;
      this.nit_ips = nit_ips;
      this.cod_municipio = cod_municipio;
    }
  }
  