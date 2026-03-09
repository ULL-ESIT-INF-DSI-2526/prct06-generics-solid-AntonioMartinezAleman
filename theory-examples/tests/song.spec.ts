import { describe, it, expect } from "vitest";
import { Song } from "../src/ejercicio-modificacion/song";

describe("Song", () => {

  it("crear song", () => {
    const s = new Song("cancion1", "artista1", "genero1", "album1", 100);
    expect(s.getTitulo()).toBe("cancion1");
    expect(s.getArtista()).toBe("artista1");
    expect(s.getGenero()).toBe("genero1");
    expect(s.getAlbum()).toBe("album1");
  });

  it("data", () => {
    const s = new Song("cancion2", "artista2", "genero2", "album2", 200);
    expect(s.data()).toBe("cancion2 - artista2");
  });

  it("duration", () => {
    const s = new Song("cancion3", "artista3", "genero3", "album3", 300);
    expect(s.duration()).toBe(300);
  });

  it("titulo vacio", () => {
    expect(() => {
      new Song("", "artista1", "genero1", "album1", 100);
    }).toThrow();
  });

  it("artista vacio", () => {
    expect(() => {
      new Song("cancion1", "", "genero1", "album1", 100);
    }).toThrow();
  });

  it("genero vacio", () => {
    expect(() => {
      new Song("cancion1", "artista1", "", "album1", 100);
    }).toThrow();
  });

  it("album vacio", () => {
    expect(() => {
      new Song("cancion1", "artista1", "genero1", "", 100);
    }).toThrow();
  });

  it("duracion negativa", () => {
    expect(() => {
      new Song("cancion1", "artista1", "genero1", "album1", -1);
    }).toThrow();
  });

});