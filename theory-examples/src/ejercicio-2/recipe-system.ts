/**
 * Contrato genérico para repositorios.
 *
 * @typeParam T Tipo de elemento almacenado.
 * @typeParam K Tipo de identificador.
 */
export interface Repository<T, K> {
  /**
   * Añade un elemento al repositorio.
   * @param item Elemento a añadir.
   */
  add(item: T): void;

  /**
   * Elimina un elemento por identificador.
   * @param id Identificador del elemento.
   * @returns `true` si se elimina, `false` en caso contrario.
   */
  remove(id: K): boolean;

  /**
   * Devuelve un elemento por identificador.
   * @param id Identificador buscado.
   * @returns Elemento encontrado o `undefined`.
   */
  getById(id: K): T | undefined;

  /**
   * Devuelve todos los elementos almacenados.
   * @returns Copia de los elementos.
   */
  getAll(): T[];
}

/**
 * Contrato para búsqueda por nombre.
 *
 * @typeParam T Tipo devuelto.
 */
export interface SearchByName<T> {
  /**
   * Busca elementos por nombre.
   * @param name Nombre buscado.
   * @returns Elementos encontrados.
   */
  searchByName(name: string): T[];
}

/**
 * Contrato para búsqueda por etiquetas.
 *
 * @typeParam T Tipo devuelto.
 */
export interface SearchByTags<T> {
  /**
   * Busca elementos por una etiqueta.
   * @param tag Etiqueta buscada.
   * @returns Elementos encontrados.
   */
  searchByTag(tag: string): T[];
}

/**
 * Contrato para búsqueda por año.
 *
 * @typeParam T Tipo devuelto.
 */
export interface SearchByYearRange<T> {
  /**
   * Busca elementos dentro de un rango de años.
   * @param from Año inicial.
   * @param to Año final.
   * @returns Elementos encontrados.
   */
  searchByYearRange(from: number, to: number): T[];
}

/**
 * Contrato para búsqueda por opcionalidad.
 *
 * @typeParam T Tipo devuelto.
 */
export interface SearchByOptional<T> {
  /**
   * Busca elementos por opcionalidad.
   * @param optional Valor de opcionalidad.
   * @returns Elementos encontrados.
   */
  searchByOptional(optional: boolean): T[];
}

/**
 * Paso básico de una receta.
 */
export class Step {
  /**
   * @param id Identificador del paso.
   * @param name Nombre del paso.
   * @param description Descripción del paso.
   * @param minutes Tiempo estimado en minutos.
   * @param tags Etiquetas asociadas.
   * @param optional Indica si el paso es opcional.
   */
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly minutes: number,
    public readonly tags: string[] = [],
    public readonly optional: boolean = false,
  ) {
    if (id.trim().length === 0) {
      throw new Error("Step id cannot be empty");
    }
    if (name.trim().length === 0) {
      throw new Error("Step name cannot be empty");
    }
    if (minutes < 0 || !Number.isFinite(minutes)) {
      throw new Error("Step minutes must be a non-negative number");
    }
  }
}

/**
 * Paso con herramienta necesaria.
 */
export class StepWithTool extends Step {
  /**
   * @param id Identificador del paso.
   * @param name Nombre del paso.
   * @param description Descripción del paso.
   * @param minutes Tiempo estimado.
   * @param tool Herramienta necesaria.
   * @param tags Etiquetas.
   * @param optional Indica si es opcional.
   */
  constructor(
    id: string,
    name: string,
    description: string,
    minutes: number,
    public readonly tool: string,
    tags: string[] = [],
    optional: boolean = false,
  ) {
    super(id, name, description, minutes, tags, optional);

    if (tool.trim().length === 0) {
      throw new Error("Tool cannot be empty");
    }
  }
}

/**
 * Paso con temperatura objetivo.
 */
export class StepWithTemperature extends Step {
  /**
   * @param id Identificador del paso.
   * @param name Nombre del paso.
   * @param description Descripción.
   * @param minutes Tiempo estimado.
   * @param temperature Temperatura objetivo.
   * @param tags Etiquetas.
   * @param optional Indica si es opcional.
   */
  constructor(
    id: string,
    name: string,
    description: string,
    minutes: number,
    public readonly temperature: number,
    tags: string[] = [],
    optional: boolean = false,
  ) {
    super(id, name, description, minutes, tags, optional);

    if (!Number.isFinite(temperature)) {
      throw new Error("Temperature must be a valid number");
    }
  }
}

/**
 * Receta.
 */
export class Recipe {
  /**
   * @param id Identificador de la receta.
   * @param name Nombre de la receta.
   * @param year Año asociado a la receta.
   * @param steps Pasos de la receta.
   */
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly year: number,
    public readonly steps: Step[] = [],
  ) {
    if (id.trim().length === 0) {
      throw new Error("Recipe id cannot be empty");
    }
    if (name.trim().length === 0) {
      throw new Error("Recipe name cannot be empty");
    }
    if (!Number.isInteger(year)) {
      throw new Error("Recipe year must be an integer");
    }
  }
}

/**
 * Recetario.
 */
export class Cookbook {
  /**
   * @param id Identificador del recetario.
   * @param name Nombre del recetario.
   * @param recipes Recetas contenidas.
   */
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly recipes: Recipe[] = [],
  ) {
    if (id.trim().length === 0) {
      throw new Error("Cookbook id cannot be empty");
    }
    if (name.trim().length === 0) {
      throw new Error("Cookbook name cannot be empty");
    }
  }
}

/**
 * Chef.
 */
export class Chef {
  /**
   * @param id Identificador del chef.
   * @param name Nombre del chef.
   * @param followers Número de seguidores.
   * @param cookbooks Recetarios del chef.
   */
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly followers: number,
    public readonly cookbooks: Cookbook[] = [],
  ) {
    if (id.trim().length === 0) {
      throw new Error("Chef id cannot be empty");
    }
    if (name.trim().length === 0) {
      throw new Error("Chef name cannot be empty");
    }
    if (followers < 0 || !Number.isFinite(followers)) {
      throw new Error("Followers must be a non-negative number");
    }
  }
}

/**
 * Repositorio genérico en memoria.
 *
 * @typeParam T Tipo almacenado.
 * @typeParam K Tipo de identificador.
 */
export abstract class InMemoryRepository<T, K> implements Repository<T, K> {
  /**
   * Elementos almacenados internamente.
   */
  protected items: T[] = [];

  /**
   * @param initialItems Elementos iniciales.
   */
  constructor(initialItems: T[] = []) {
    initialItems.forEach((item) => this.add(item));
  }

  /**
   * Devuelve el identificador de un elemento.
   * @param item Elemento.
   * @returns Identificador.
   */
  protected abstract getId(item: T): K;

  /**
   * Valida un elemento antes de añadirlo.
   * @param item Elemento a validar.
   */
  protected validateItem(_item: T): void {
    void _item;
  }

  /**
   * Añade un elemento.
   * @param item Elemento.
   */
  add(item: T): void {
    this.validateItem(item);

    const id = this.getId(item);
    const alreadyExists = this.items.some(
      (storedItem) => this.getId(storedItem) === id,
    );

    if (alreadyExists) {
      throw new Error(`Item with id "${String(id)}" already exists`);
    }

    this.items.push(item);
  }

  /**
   * Elimina por id.
   * @param id Identificador.
   * @returns `true` si se elimina.
   */
  remove(id: K): boolean {
    const initialLength = this.items.length;
    this.items = this.items.filter((item) => this.getId(item) !== id);
    return this.items.length < initialLength;
  }

  /**
   * Obtiene por id.
   * @param id Identificador.
   * @returns Elemento o `undefined`.
   */
  getById(id: K): T | undefined {
    return this.items.find((item) => this.getId(item) === id);
  }

  /**
   * Devuelve todos los elementos.
   * @returns Copia de los elementos.
   */
  getAll(): T[] {
    return [...this.items];
  }
}

/**
 * Repositorio de chefs.
 */
export class ChefRepository
  extends InMemoryRepository<Chef, string>
  implements SearchByName<Chef>
{
  /**
   * @param item Chef.
   * @returns Identificador.
   */
  protected getId(item: Chef): string {
    return item.id;
  }

  /**
   * Busca chefs por nombre.
   * @param name Nombre buscado.
   * @returns Chefs encontrados.
   */
  searchByName(name: string): Chef[] {
    if (name.trim().length === 0) {
      throw new Error("Chef name cannot be empty");
    }

    return this.items.filter(
      (chef) => chef.name.toLowerCase() === name.toLowerCase(),
    );
  }

  /**
   * Busca chefs con un mínimo de seguidores.
   * @param minFollowers Mínimo de seguidores.
   * @returns Chefs encontrados.
   */
  searchByMinFollowers(minFollowers: number): Chef[] {
    if (!Number.isFinite(minFollowers) || minFollowers < 0) {
      throw new Error("Minimum followers must be a non-negative number");
    }

    return this.items.filter((chef) => chef.followers >= minFollowers);
  }
}

/**
 * Repositorio de recetas.
 */
export class RecipeRepository
  extends InMemoryRepository<Recipe, string>
  implements SearchByName<Recipe>, SearchByYearRange<Recipe>
{
  /**
   * @param item Receta.
   * @returns Identificador.
   */
  protected getId(item: Recipe): string {
    return item.id;
  }

  /**
   * Busca recetas por nombre.
   * @param name Nombre buscado.
   * @returns Recetas encontradas.
   */
  searchByName(name: string): Recipe[] {
    if (name.trim().length === 0) {
      throw new Error("Recipe name cannot be empty");
    }

    return this.items.filter(
      (recipe) => recipe.name.toLowerCase() === name.toLowerCase(),
    );
  }

  /**
   * Busca recetas por rango de años.
   * @param from Año inicial.
   * @param to Año final.
   * @returns Recetas encontradas.
   */
  searchByYearRange(from: number, to: number): Recipe[] {
    if (!Number.isInteger(from) || !Number.isInteger(to)) {
      throw new Error("Year range must use integers");
    }
    if (from > to) {
      throw new Error("Invalid year range");
    }

    return this.items.filter((recipe) => recipe.year >= from && recipe.year <= to);
  }
}

/**
 * Repositorio de pasos.
 */
export class StepRepository
  extends InMemoryRepository<Step, string>
  implements SearchByName<Step>, SearchByTags<Step>, SearchByOptional<Step>
{
  /**
   * @param item Paso.
   * @returns Identificador.
   */
  protected getId(item: Step): string {
    return item.id;
  }

  /**
   * Busca pasos por nombre.
   * @param name Nombre.
   * @returns Pasos encontrados.
   */
  searchByName(name: string): Step[] {
    if (name.trim().length === 0) {
      throw new Error("Step name cannot be empty");
    }

    return this.items.filter(
      (step) => step.name.toLowerCase() === name.toLowerCase(),
    );
  }

  /**
   * Busca pasos por etiqueta.
   * @param tag Etiqueta buscada.
   * @returns Pasos encontrados.
   */
  searchByTag(tag: string): Step[] {
    if (tag.trim().length === 0) {
      throw new Error("Tag cannot be empty");
    }

    return this.items.filter((step) =>
      step.tags.some((currentTag) => currentTag.toLowerCase() === tag.toLowerCase()),
    );
  }

  /**
   * Busca pasos por opcionalidad.
   * @param optional Valor.
   * @returns Pasos encontrados.
   */
  searchByOptional(optional: boolean): Step[] {
    return this.items.filter((step) => step.optional === optional);
  }
}

/**
 * Servicio encargado de estimar tiempos de recetas.
 */
export class RecipeTimeEstimator {
  /**
   * Cuenta el número de pasos de una receta.
   * @param recipe Receta.
   * @returns Número de pasos.
   */
  countSteps(recipe: Recipe): number {
    return recipe.steps.length;
  }

  /**
   * Estima el tiempo de una receta.
   * Si hay pasos opcionales devuelve un rango.
   *
   * @param recipe Receta.
   * @returns Tiempo total o rango de tiempo.
   */
  estimateTime(recipe: Recipe): number | { min: number; max: number } {
    const mandatorySteps = recipe.steps.filter((step) => !step.optional);
    const optionalSteps = recipe.steps.filter((step) => step.optional);

    const min = mandatorySteps.reduce((sum, step) => sum + step.minutes, 0);
    const optionalTotal = optionalSteps.reduce((sum, step) => sum + step.minutes, 0);

    if (optionalSteps.length === 0) {
      return min;
    }

    return {
      min,
      max: min + optionalTotal,
    };
  }
}

/**
 * Abstracción de renderizado tabular.
 *
 * @typeParam T Tipo de dato a renderizar.
 */
export interface TablePresenter<T> {
  /**
   * Presenta los datos como tabla.
   * @param rows Filas a presentar.
   */
  render(rows: T[]): void;
}

/**
 * Implementación de presentación usando console.table.
 *
 * @typeParam T Tipo de dato a renderizar.
 */
export class ConsoleTableRenderer<T> implements TablePresenter<T> {
  /**
   * Presenta las filas con console.table.
   * @param rows Filas a mostrar.
   */
  render(rows: T[]): void {
    console.table(rows);
  }
}