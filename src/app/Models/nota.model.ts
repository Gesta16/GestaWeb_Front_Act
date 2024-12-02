export class Nota {

    id: number;
    descripcion: string;
    usuario_id: number;

    constructor (
        id: number,
        descripcion: string,
        usuario_id: number,
    ){
        this.id = id;
        this.descripcion = descripcion;
        this.usuario_id = usuario_id;
    }
}
