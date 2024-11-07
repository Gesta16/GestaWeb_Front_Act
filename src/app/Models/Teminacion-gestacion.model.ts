export class TerminacionGestacion {
    cod_terminacion: number;
    nom_terminacion: string; 

    constructor(
        cod_terminacion: number,
        nom_terminacion: string,
    ){
        this.cod_terminacion = cod_terminacion;
        this.nom_terminacion = nom_terminacion;
    }
}
