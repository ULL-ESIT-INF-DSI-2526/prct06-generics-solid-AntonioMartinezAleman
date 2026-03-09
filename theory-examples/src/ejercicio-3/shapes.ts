/**
 * Interfaz que representa una figura geométrica.
 */
export interface Shape {
  /**
   * Calcula el área de la figura.
   * @returns Área de la figura.
   */
  getArea(): number;
}

/**
 * Representa un círculo.
 */
export class Circle implements Shape {
  /**
   * @param radius Radio del círculo.
   */
  constructor(public readonly radius: number) {
    if (!Number.isFinite(radius) || radius <= 0) {
      throw new Error("Circle radius must be a positive number");
    }
  }

  /**
   * Calcula el área del círculo.
   * @returns Área del círculo.
   */
  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

/**
 * Representa un rectángulo.
 */
export class Rectangle implements Shape {
  /**
   * @param width Anchura del rectángulo.
   * @param height Altura del rectángulo.
   */
  constructor(
    public readonly width: number,
    public readonly height: number,
  ) {
    if (!Number.isFinite(width) || width <= 0) {
      throw new Error("Rectangle width must be a positive number");
    }
    if (!Number.isFinite(height) || height <= 0) {
      throw new Error("Rectangle height must be a positive number");
    }
  }

  /**
   * Calcula el área del rectángulo.
   * @returns Área del rectángulo.
   */
  getArea(): number {
    return this.width * this.height;
  }
}

/**
 * Representa un triángulo.
 */
export class Triangle implements Shape {
  /**
   * @param base Base del triángulo.
   * @param height Altura del triángulo.
   */
  constructor(
    public readonly base: number,
    public readonly height: number,
  ) {
    if (!Number.isFinite(base) || base <= 0) {
      throw new Error("Triangle base must be a positive number");
    }
    if (!Number.isFinite(height) || height <= 0) {
      throw new Error("Triangle height must be a positive number");
    }
  }

  /**
   * Calcula el área del triángulo.
   * @returns Área del triángulo.
   */
  getArea(): number {
    return (this.base * this.height) / 2;
  }
}

/**
 * Calculadora de áreas desacoplada de tipos concretos.
 */
export class AreaCalculator {
  /**
   * Calcula el área de una figura.
   * @param shape Figura geométrica.
   * @returns Área calculada.
   */
  area(shape: Shape): number {
    return shape.getArea();
  }
}