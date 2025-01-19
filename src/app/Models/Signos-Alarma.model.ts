export class SignoAlarma {
    
    id: number;
    nombre: string;
    descripcion: string;


    constructor({
        id= 0,
        nombre= '',
        descripcion= '',

    }: {
        id?: number;
        nombre?: string,
        descripcion?: string,

    } = {}) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;

    }
}