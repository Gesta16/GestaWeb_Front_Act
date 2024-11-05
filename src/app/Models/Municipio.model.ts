export class Municipio {
    cod_municipio: number;
    nom_municipio: string;
    cod_departamento: number;

    constructor(
        cod_municipio: number,
        nom_municipio: string,
        cod_departamento: number,
    ){
        this.cod_municipio = cod_municipio;
        this.nom_municipio = nom_municipio;
        this.cod_departamento = cod_departamento;
    }
}