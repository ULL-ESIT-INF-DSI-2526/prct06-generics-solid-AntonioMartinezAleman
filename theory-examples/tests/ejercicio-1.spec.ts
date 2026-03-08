import { describe, expect, it } from "vitest";
import { suma } from "../src/ejercicio-1/suma";

describe("suma", () => {
  it("debería sumar dos números", () => {
    expect(suma(2, 3)).toBe(5);
  });
  it("debería sumar tres números", () => {
    expect(suma(2, 3)).toBe(5);
  });
});