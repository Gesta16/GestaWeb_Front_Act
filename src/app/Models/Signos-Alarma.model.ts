export class SignoAlarma {
    
    id: number;
    nombre: string;
    descripcion: string;
    documento: string;

    constructor({
        id= 0,
        nombre= '',
        descripcion= '',
        documento= '',
    }: {
        id?: number;
        nombre?: string,
        descripcion?: string,
        documento?: string,
    } = {}) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.documento = documento;
    }
}