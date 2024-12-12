export class SignoAlarma {
   
    nombre: string;
    descripcion: string;

    constructor({
        nombre= '',
        descripcion= ''
    }: {
        nombre?: string,
        descripcion?: string
    } = {}) {
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
}