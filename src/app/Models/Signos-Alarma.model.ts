export class SignoAlarma {
   
    nombre: string;
    descripcion: string;
    documento: string;

    constructor({
        nombre= '',
        descripcion= '',
        documento= '',
    }: {
        nombre?: string,
        descripcion?: string,
        documento?: string,
    } = {}) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.documento = documento;
    }
}