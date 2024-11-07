export class DiagnosticoNutricional {
    cod_diagnostico: number;
    nom_diagnostico: string;

    constructor(cod_diagnostico: number, nom_diagnostico: string) {
        this.cod_diagnostico = cod_diagnostico;
        this.nom_diagnostico = nom_diagnostico;
    }
}
