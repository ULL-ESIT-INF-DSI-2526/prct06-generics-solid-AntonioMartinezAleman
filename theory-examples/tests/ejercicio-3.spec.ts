import { describe, expect, it } from "vitest";
import {
  AreaCalculator,
  Circle,
  Rectangle,
  Triangle,
  Shape,
} from "../src/ejercicio-3/shapes";

describe("Ejercicio 3 - Shapes", () => {
  const calculator = new AreaCalculator();

  it("should calculate the area of a circle", () => {
    const circle = new Circle(2);
    expect(calculator.area(circle)).toBeCloseTo(Math.PI * 4);
  });

  it("should calculate the area of a rectangle", () => {
    const rectangle = new Rectangle(4, 5);
    expect(calculator.area(rectangle)).toBe(20);
  });

  it("should calculate the area of a triangle", () => {
    const triangle = new Triangle(6, 3);
    expect(calculator.area(triangle)).toBe(9);
  });

  it("should allow extending the system without modifying AreaCalculator", () => {
    class Square implements Shape {
      constructor(public readonly side: number) {
        if (!Number.isFinite(side) || side <= 0) {
          throw new Error("Square side must be a positive number");
        }
      }

      getArea(): number {
        return this.side * this.side;
      }
    }

    const square = new Square(4);
    expect(calculator.area(square)).toBe(16);
  });

  it("should throw an error for invalid circle radius", () => {
    expect(() => new Circle(0)).toThrowError(
      "Circle radius must be a positive number",
    );
  });

  it("should throw an error for invalid rectangle dimensions", () => {
    expect(() => new Rectangle(-1, 5)).toThrowError(
      "Rectangle width must be a positive number",
    );
  });

  it("should throw an error for invalid triangle dimensions", () => {
    expect(() => new Triangle(6, 0)).toThrowError(
      "Triangle height must be a positive number",
    );
  });
});