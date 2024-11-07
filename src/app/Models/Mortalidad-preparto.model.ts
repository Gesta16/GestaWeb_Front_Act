export class MortalidadPreparto {
    cod_mortalpreparto: number;
    id_usuario: number;
    cod_mortalidad: number;
    fec_defuncion: string;
    num_proceso: number;


    constructor(
        {
            cod_mortalpreparto = 0,
            id_usuario = 0,
            cod_mortalidad = 0,
            fec_defuncion = '',
            num_proceso = 0
        }: {
            cod_mortalpreparto?: number,
            id_usuario?: number,
            cod_mortalidad?: number,
            fec_defuncion?: string,
            num_proceso?: number
        } = {}) {
        this.cod_mortalpreparto = cod_mortalpreparto;
        this.id_usuario = id_usuario;
        this.cod_mortalidad = cod_mortalidad;
        this.fec_defuncion = fec_defuncion;
        this.num_proceso = num_proceso
    }
}
