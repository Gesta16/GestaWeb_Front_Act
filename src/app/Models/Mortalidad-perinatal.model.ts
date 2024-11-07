export class MortalidadPerinatal {
    cod_mortalidad: number;
    cla_muerte: string;

    constructor(
        cod_mortalidad: number,
        cla_muerte: string,
    ){
        this.cod_mortalidad = cod_mortalidad;
        this.cla_muerte = cla_muerte;
    }
}
