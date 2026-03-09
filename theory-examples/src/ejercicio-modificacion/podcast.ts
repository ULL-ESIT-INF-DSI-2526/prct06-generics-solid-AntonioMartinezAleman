import { Reproducible } from "./reproducible";

/**
 * para que en data lo unico que devuelva la clase podcast sean los dos atributos indispensables
 */
export interface DatosPodcast {
  nombrePrograma: string;
  numeroEpisodio: number;
}

/**
 * clase que implementa un podcast con todos sus atributos correspondientes
 */
export class Podcast implements Reproducible<DatosPodcast> {
  /**
   * 
   * @param nombrePrograma 
   * @param numeroEpisodio 
   * @param tematica 
   * @param presentador 
   * @param fechaInicio 
   * @param fechaFin 
   */
  constructor(
    private readonly nombrePrograma: string,
    private readonly numeroEpisodio: number,
    private readonly tematica: string,
    private readonly presentador: string,
    private readonly fechaInicio: Date,
    private readonly fechaFin: Date,
  ) {
    if (nombrePrograma.trim().length === 0) {
      throw new Error("El nombre del programa no puede estar vacio");
    }
    if (!Number.isInteger(numeroEpisodio) || numeroEpisodio <= 0) {
      throw new Error("El numero de programa no es valido");
    }
    if (fechaFin.getTime() < fechaInicio.getTime()) {
      throw new Error("fechas incorrectas");
    }
    if (tematica.trim().length === 0) {
      throw new Error("La tematica no puede estar vacia");
    }
    if (presentador.trim().length === 0) {
      throw new Error("El presentador no puede estar vacio");
    }
    if (Number.isNaN(fechaInicio.getTime())) {
     throw new Error("fecha de inicio no es valida");
    }
    if (Number.isNaN(fechaFin.getTime())) {
      throw new Error("fecha de fin no es valida");
    }
  }
  getNombrePrograma(): string {
    return this.nombrePrograma;
  }
  getNumeroEpisodio(): number {
    return this.numeroEpisodio;
  }
  getTematica(): string {
    return this.tematica;
  }
  getPresentador(): string {
    return this.presentador;
  }
  getFechaInicio(): Date {
    return this.fechaInicio;
  }
  getFechaFin(): Date {
    return this.fechaFin;
  }
  
  /**
   * 
   * @returns como se usa interfaz como tipo de la clase devuelve los dos datos que pide la interfaz obligatorio
   */
  data(): DatosPodcast {
    return {
      nombrePrograma: this.nombrePrograma,
      numeroEpisodio: this.numeroEpisodio,
    };
  }
  
  /**
   * 
   * @returns duracion del podcast en segundos
   */
  duration(): number {
    const diferencia = this.fechaFin.getTime() - this.fechaInicio.getTime();
    return diferencia / 1000;
  }
}