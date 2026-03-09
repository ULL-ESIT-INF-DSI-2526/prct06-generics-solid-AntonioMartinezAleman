/**
 * Posibles afiliaciones galácticas.
 */
export type Affiliation = "República" | "Imperio" | "Sith" | "Independiente";

/**
 * Entidad galáctica con propiedades comunes.
 */
export interface GalacticEntity {
  name: string;
  affiliation: Affiliation;
  year: number;
  originPlanet: string;
}

/**
 * Maestro Jedi.
 */
export interface JediMaster extends GalacticEntity {
  powerLevel: number;
}

/**
 * Nave espacial.
 */
export interface Starship extends GalacticEntity {
  shipClass: string;
}

/**
 * Holocrón.
 */
export interface Holocron extends GalacticEntity {
  powerLevel: number;
}

/**
 * Gestión básica de colecciones.
 */
export interface CollectionManager<T> {
  add(item: T): void;
  remove(name: string): boolean;
  getAll(): T[];
}

/**
 * Búsqueda por nombre.
 */
export interface SearchByName<T> {
  searchByName(name: string): T[];
}

/**
 * Búsqueda por afiliación.
 */
export interface SearchByAffiliation<T> {
  searchByAffiliation(affiliation: Affiliation): T[];
}

/**
 * Búsqueda por año.
 */
export interface SearchByYear<T> {
  searchByYear(year: number): T[];
}

/**
 * Búsqueda por planeta.
 */
export interface SearchByOriginPlanet<T> {
  searchByOriginPlanet(planet: string): T[];
}

/**
 * Búsqueda por clase o nivel.
 */
export interface SearchByClassOrPower<T> {
  searchByClassOrPower(value: string | number): T[];
}

/**
 * Registro galáctico completo.
 */
export interface GalacticRegistry<T>
  extends CollectionManager<T>,
    SearchByName<T>,
    SearchByAffiliation<T>,
    SearchByYear<T>,
    SearchByOriginPlanet<T>,
    SearchByClassOrPower<T> {}

/**
 * Clase abstracta con lógica común.
 */
export abstract class BasicGalacticCollection<T extends GalacticEntity>
  implements GalacticRegistry<T>
{
  protected items: T[] = [];

  add(item: T): void {
    if (!item.name) throw new Error("Entity name cannot be empty");

    if (this.items.some((i) => i.name === item.name)) {
      throw new Error(`Entity with name "${item.name}" already exists`);
    }

    this.items.push(item);
  }

  remove(name: string): boolean {
    const initialLength = this.items.length;
    this.items = this.items.filter((i) => i.name !== name);
    return this.items.length < initialLength;
  }

  getAll(): T[] {
    return [...this.items];
  }

  searchByName(name: string): T[] {
    return this.items.filter((i) => i.name === name);
  }

  searchByAffiliation(affiliation: Affiliation): T[] {
    return this.items.filter((i) => i.affiliation === affiliation);
  }

  searchByYear(year: number): T[] {
    return this.items.filter((i) => i.year === year);
  }

  searchByOriginPlanet(planet: string): T[] {
    return this.items.filter((i) => i.originPlanet === planet);
  }

  abstract searchByClassOrPower(value: string | number): T[];
}

/**
 * Colección de maestros Jedi.
 */
export class JediMasterCollection extends BasicGalacticCollection<JediMaster> {
  searchByClassOrPower(value: string | number): JediMaster[] {
    if (typeof value !== "number") {
      throw new Error("Jedi power level must be a number");
    }
    return this.items.filter((j) => j.powerLevel === value);
  }
}

/**
 * Colección de naves espaciales.
 */
export class StarshipCollection extends BasicGalacticCollection<Starship> {
  searchByClassOrPower(value: string | number): Starship[] {
    if (typeof value !== "string") {
      throw new Error("Starship class must be a string");
    }
    return this.items.filter((s) => s.shipClass === value);
  }
}

/**
 * Colección de holocrones.
 */
export class HolocronCollection extends BasicGalacticCollection<Holocron> {
  searchByClassOrPower(value: string | number): Holocron[] {
    if (typeof value !== "number") {
      throw new Error("Holocron power level must be a number");
    }
    return this.items.filter((h) => h.powerLevel === value);
  }
}