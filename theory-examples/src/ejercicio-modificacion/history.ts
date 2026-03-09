import { Reproducible } from "./reproducible";

export class History<T extends Reproducible<unknown>> {
  private readonly elementos: T[] = [];

  /**
   * añade un elemento, es decir, una cancion o un podcast al array 
   * @param elemento 
   */
  add(elemento: T): void {
    this.elementos.push(elemento);
  }

  /**
   * elimina un elemento del array elementos basandote en el indice que le pasas
   * @param indice 
   * @returns verdadero si consigue eliminarlo o falso si no
   */
  remove(indice: number): boolean {
    if (indice < 0 || indice >= this.elementos.length) {
     return false;
    }
    this.elementos.splice(indice, 1);
    return true;
  }

  /**
   * 
   * @param indice 
   * @returns contenido del array segun el indice, puede ser song o podcast
   */
  get(indice: number): T | undefined {
    return this.elementos[indice];
  }
  
  /**
   * 
   * @returns numero de elementos del array elementos
   */
  size(): number {
    return this.elementos.length;
  }
  /**
   * 
   * @returns total de duraciones de los elementos del array historial
   */
  duration(): number {
    let sum = 0;
    for (let i = 0; i < this.elementos.length; i++) {
      sum += this.elementos[i].duration();
    }
    return sum;
  }
/**
 * 
 * @param predicado 
 * @returns crea un nuevo historial con solo los elementos que cumplen una condicion
 */
  filter(predicado: (elemento: T) => boolean): History<T> {
    const nuevoHistorial = new History<T>();
    this.elementos.forEach((elemento) => {
      if (predicado(elemento)) {
        nuevoHistorial.add(elemento);
      }
    });
    return nuevoHistorial;
  }
}