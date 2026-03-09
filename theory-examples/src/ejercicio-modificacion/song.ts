import { Reproducible } from "./reproducible";

/**
 * clase song que implementa todos los datos acerca de una cancion cualquiera
 */
export class Song implements Reproducible<string> {
  /**
   * 
   * @param titulo 
   * @param artista 
   * @param genero 
   * @param album 
   * @param duracionSegundos 
   */
  constructor(
    private readonly titulo: string,
    private readonly artista: string,
    private readonly genero: string,
    private readonly album: string,
    private readonly duracionSegundos: number,
  ) {
    if (titulo.trim().length === 0) {
      throw new Error("El titulo de la canción no puede estar vacio");
    }
    if (artista.trim().length === 0) {
      throw new Error("El artista no puede estar vacio");
    }
    if (duracionSegundos < 0 || !Number.isFinite(duracionSegundos)) {
      throw new Error("duracion de la cancion no es valida");
    }
    if (genero.trim().length === 0) {
      throw new Error("El genero no puede estar vacio");
    }
    if (album.trim().length === 0) {
      throw new Error("El album no puede estar vacio");
    }
  }

  getTitulo(): string {
    return this.titulo;
  }
  getArtista(): string {
    return this.artista;
  }
  getGenero(): string{
    return this.genero;
  }
  getAlbum(): string{
    return this.album;
  }
  /**
   * 
   * @returns la duracion de la cancion
   */
  duration() : number {
    return this.duracionSegundos
  }
  
  /**
   * 
   * @returns datos minimo para identificar el nombre de la cancion y el artist
   */
  data(): string {
    return `${this.titulo} - ${this.artista}`;
  }
}