export class Regimen {
    cod_regimen: number;
    nom_regimen: string;

    constructor(
        cod_regimen: number,
        nom_regimen: string
    ){
        this.cod_regimen = cod_regimen;
        this.nom_regimen = nom_regimen;
    }
}
