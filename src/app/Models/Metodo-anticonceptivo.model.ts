export class MetodoAnticonceptivo {
    cod_metodo: number;
    nom_metodo: string;

    constructor(
        cod_metodo: number,
        nom_metodo: string,
    ){
        this.cod_metodo = cod_metodo;
        this.nom_metodo = nom_metodo;
    }
}
