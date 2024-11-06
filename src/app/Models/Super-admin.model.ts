export class SuperAdmin {
    nom_superadmin: string;
    ape_superadmin: string;
    email_superadmin: string;
    tel_superadmin: string;
    cod_documento: number;
    documento_superadmin: string;

    constructor({
        nom_superadmin= '',
        ape_superadmin= '',
        email_superadmin= '',
        tel_superadmin= '',
        cod_documento= 0,
        documento_superadmin= ''
    }: {
            nom_superadmin?: string,
            ape_superadmin?: string,
            email_superadmin?: string,
            tel_superadmin?: string,
            cod_documento?: number,
            documento_superadmin?: string,
        } = {}) {
        this.nom_superadmin = nom_superadmin;
        this.ape_superadmin = ape_superadmin;
        this.email_superadmin = email_superadmin;
        this.tel_superadmin = tel_superadmin;
        this.cod_documento = cod_documento;
        this.documento_superadmin = documento_superadmin;
    }
}