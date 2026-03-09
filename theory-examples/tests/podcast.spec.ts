import { describe, it, expect } from "vitest";
import { Podcast } from "../src/ejercicio-modificacion/podcast";

describe("Podcast", () => {

  it("crear podcast", () => {
    const p = new Podcast(
      "programa1",
      1,
      "tema1",
      "presentador1",
      new Date("2024-01-01T10:00:00"),
      new Date("2024-01-01T10:30:00")
    );
    expect(p.getNombrePrograma()).toBe("programa1");
    expect(p.getNumeroEpisodio()).toBe(1);
    expect(p.getTematica()).toBe("tema1");
    expect(p.getPresentador()).toBe("presentador1");
  });

  it("data", () => {
    const p = new Podcast(
      "programa2",
      2,
      "tema2",
      "presentador2",
      new Date("2024-01-01T10:00:00"),
      new Date("2024-01-01T10:10:00")
    );
    expect(p.data()).toEqual({
      nombrePrograma: "programa2",
      numeroEpisodio: 2,
    });
  });

  it("duration", () => {
    const p = new Podcast(
      "programa3",
      3,
      "tema3",
      "presentador3",
      new Date("2024-01-01T10:00:00"),
      new Date("2024-01-01T10:01:00")
    );
    expect(p.duration()).toBe(60);
  });

  it("nombre vacio", () => {
    expect(() => {
      new Podcast(
        "",
        1,
        "tema1",
        "presentador1",
        new Date("2024-01-01T10:00:00"),
        new Date("2024-01-01T10:10:00")
      );
    }).toThrow();
  });

  it("episodio incorrecto", () => {
    expect(() => {
      new Podcast(
        "programa1",
        0,
        "tema1",
        "presentador1",
        new Date("2024-01-01T10:00:00"),
        new Date("2024-01-01T10:10:00")
      );
    }).toThrow();
  });

  it("tematica vacia", () => {
    expect(() => {
      new Podcast(
        "programa1",
        1,
        "",
        "presentador1",
        new Date("2024-01-01T10:00:00"),
        new Date("2024-01-01T10:10:00")
      );
    }).toThrow();
  });

  it("presentador vacio", () => {
    expect(() => {
      new Podcast(
        "programa1",
        1,
        "tema1",
        "",
        new Date("2024-01-01T10:00:00"),
        new Date("2024-01-01T10:10:00")
      );
    }).toThrow();
  });

  it("fechas incorrectas", () => {
    expect(() => {
      new Podcast(
        "programa1",
        1,
        "tema1",
        "presentador1",
        new Date("2024-01-01T10:10:00"),
        new Date("2024-01-01T10:00:00")
      );
    }).toThrow();
  });

});