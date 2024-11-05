export class TipoDocumento {
    cod_documento: number; 
    nom_documento: string; 
  
    constructor(
      cod_documento: number,
      nom_documento: string
    ) {
      this.cod_documento = cod_documento;
      this.nom_documento = nom_documento;
    }
  }
  