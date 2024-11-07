export class FormaMedicion {
    cod_medicion: number;
    nom_forma: string;

    constructor(
        cod_medicion: number,
        nom_forma: string,
    ) {
        this.cod_medicion = cod_medicion;
        this.nom_forma = nom_forma;
    }
}
