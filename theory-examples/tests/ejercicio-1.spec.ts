import { describe, expect, it, beforeEach } from "vitest";
import {
  JediMasterCollection,
  StarshipCollection,
  HolocronCollection,
  JediMaster,
  Starship,
  Holocron,
} from "../src/ejercicio-1/galactic-registry";

describe("Ejercicio 1 - Galactic Registry", () => {
  let jedis: JediMasterCollection;
  let ships: StarshipCollection;
  let holocrons: HolocronCollection;

  const yoda: JediMaster = {
    name: "Yoda",
    affiliation: "República",
    year: 896,
    originPlanet: "Dagobah",
    powerLevel: 100,
  };

  const tie: Starship = {
    name: "TIE Advanced",
    affiliation: "Imperio",
    year: 0,
    originPlanet: "Coruscant",
    shipClass: "Experimental",
  };

  const sithHolocron: Holocron = {
    name: "Sith Archive",
    affiliation: "Sith",
    year: -4000,
    originPlanet: "Korriban",
    powerLevel: 95,
  };

  beforeEach(() => {
    jedis = new JediMasterCollection();
    ships = new StarshipCollection();
    holocrons = new HolocronCollection();
  });

  it("should add a Jedi", () => {
    jedis.add(yoda);
    expect(jedis.getAll()).toHaveLength(1);
  });

  it("should search Jedi by name", () => {
    jedis.add(yoda);
    expect(jedis.searchByName("Yoda")).toEqual([yoda]);
  });

  it("should search starship by affiliation", () => {
    ships.add(tie);
    expect(ships.searchByAffiliation("Imperio")).toEqual([tie]);
  });

  it("should search holocron by planet", () => {
    holocrons.add(sithHolocron);
    expect(holocrons.searchByOriginPlanet("Korriban")).toEqual([
      sithHolocron,
    ]);
  });

  it("should search Jedi by power level", () => {
    jedis.add(yoda);
    expect(jedis.searchByClassOrPower(100)).toEqual([yoda]);
  });

  it("should search starship by class", () => {
    ships.add(tie);
    expect(ships.searchByClassOrPower("Experimental")).toEqual([tie]);
  });

  it("should remove entity", () => {
    jedis.add(yoda);
    jedis.remove("Yoda");
    expect(jedis.getAll()).toHaveLength(0);
  });
});