import { describe, it, expect } from "vitest";
import { History } from "../src/ejercicio-modificacion/history";
import { Song } from "../src/ejercicio-modificacion/song";
import { Podcast } from "../src/ejercicio-modificacion/podcast";

describe("History", () => {

  it("add y size con canciones", () => {
    const h = new History<Song>();
    const s1 = new Song("c1", "a1", "g1", "al1", 100);
    const s2 = new Song("c2", "a2", "g2", "al2", 200);
    h.add(s1);
    h.add(s2);
    expect(h.size()).toBe(2);
  });

  it("get", () => {
    const h = new History<Song>();
    const s = new Song("c1", "a1", "g1", "al1", 100);
    h.add(s);
    expect(h.get(0)).toBe(s);
  });

  it("remove", () => {
    const h = new History<Song>();
    const s = new Song("c1", "a1", "g1", "al1", 100);
    h.add(s);
    h.remove(0);
    expect(h.size()).toBe(0);
  });

  it("duration con canciones", () => {
    const h = new History<Song>();
    const s1 = new Song("c1", "a1", "g1", "al1", 100);
    const s2 = new Song("c2", "a2", "g2", "al2", 200);
    h.add(s1);
    h.add(s2);
    expect(h.duration()).toBe(300);
  });

  it("filter", () => {
    const h = new History<Song>();
    const s1 = new Song("c1", "a1", "g1", "al1", 100);
    const s2 = new Song("c2", "a2", "g2", "al2", 200);
    h.add(s1);
    h.add(s2);
    const r = h.filter((e) => e.duration() > 150);
    expect(r.size()).toBe(1);
  });

  it("song y podcast juntos", () => {
    const h = new History<Song | Podcast>();
    const s = new Song("c1", "a1", "g1", "al1", 100);
    const p = new Podcast(
      "prog1",
      1,
      "tema1",
      "pres1",
      new Date("2024-01-01T10:00:00"),
      new Date("2024-01-01T10:01:00")
    );
    h.add(s);
    h.add(p);
    expect(h.size()).toBe(2);
  });

  it("duration con song y podcast", () => {
    const h = new History<Song | Podcast>();
    const s = new Song("c1", "a1", "g1", "al1", 100);
    const p = new Podcast(
      "prog1",
      1,
      "tema1",
      "pres1",
      new Date("2024-01-01T10:00:00"),
      new Date("2024-01-01T10:01:00")
    );
    h.add(s);
    h.add(p);
    expect(h.duration()).toBe(160);
  });

});