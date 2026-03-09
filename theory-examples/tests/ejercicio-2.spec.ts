import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  Chef,
  ChefRepository,
  ConsoleTableRenderer,
  Cookbook,
  Recipe,
  RecipeRepository,
  RecipeTimeEstimator,
  Step,
  StepRepository,
  StepWithTemperature,
  StepWithTool,
} from "../src/ejercicio-2/recipe-system";

describe("Ejercicio 2 - Recipe system", () => {
  let chefRepository: ChefRepository;
  let recipeRepository: RecipeRepository;
  let stepRepository: StepRepository;
  let estimator: RecipeTimeEstimator;

  const chopStep = new Step(
    "step-1",
    "Chop onion",
    "Cut the onion into small pieces",
    5,
    ["knife", "vegetables"],
    false,
  );

  const fryStep = new StepWithTemperature(
    "step-2",
    "Fry onion",
    "Cook onion in a pan",
    10,
    180,
    ["pan", "hot"],
    false,
  );

  const decorateStep = new StepWithTool(
    "step-3",
    "Decorate dish",
    "Add parsley before serving",
    2,
    "spoon",
    ["presentation"],
    true,
  );

  const recipe = new Recipe("recipe-1", "Onion dish", 2024, [
    chopStep,
    fryStep,
    decorateStep,
  ]);

  const cookbook = new Cookbook("cookbook-1", "Simple recipes", [recipe]);
  const chef = new Chef("chef-1", "Antonio", 1200, [cookbook]);

  beforeEach(() => {
    chefRepository = new ChefRepository();
    recipeRepository = new RecipeRepository();
    stepRepository = new StepRepository();
    estimator = new RecipeTimeEstimator();
  });

  it("should add and retrieve a chef", () => {
    chefRepository.add(chef);

    expect(chefRepository.getById("chef-1")).toEqual(chef);
  });

  it("should search chefs by name", () => {
    chefRepository.add(chef);

    expect(chefRepository.searchByName("Antonio")).toEqual([chef]);
  });

  it("should search chefs by minimum followers", () => {
    chefRepository.add(chef);

    expect(chefRepository.searchByMinFollowers(1000)).toEqual([chef]);
  });

  it("should add and search recipes by name", () => {
    recipeRepository.add(recipe);

    expect(recipeRepository.searchByName("Onion dish")).toEqual([recipe]);
  });

  it("should search recipes by year range", () => {
    recipeRepository.add(recipe);

    expect(recipeRepository.searchByYearRange(2020, 2025)).toEqual([recipe]);
  });

  it("should add and search steps by tag", () => {
    stepRepository.add(chopStep);
    stepRepository.add(fryStep);
    stepRepository.add(decorateStep);

    expect(stepRepository.searchByTag("presentation")).toEqual([decorateStep]);
  });

  it("should search steps by optionality", () => {
    stepRepository.add(chopStep);
    stepRepository.add(decorateStep);

    expect(stepRepository.searchByOptional(true)).toEqual([decorateStep]);
  });

  it("should count recipe steps", () => {
    expect(estimator.countSteps(recipe)).toBe(3);
  });

  it("should estimate recipe time as range when optional steps exist", () => {
    expect(estimator.estimateTime(recipe)).toEqual({
      min: 15,
      max: 17,
    });
  });

  it("should estimate recipe time as number when all steps are mandatory", () => {
    const mandatoryRecipe = new Recipe("recipe-2", "Fast dish", 2023, [
      chopStep,
      fryStep,
    ]);

    expect(estimator.estimateTime(mandatoryRecipe)).toBe(15);
  });

  it("should remove items by id", () => {
    recipeRepository.add(recipe);

    expect(recipeRepository.remove("recipe-1")).toBe(true);
    expect(recipeRepository.getById("recipe-1")).toBeUndefined();
  });

  it("should reject duplicated ids", () => {
    recipeRepository.add(recipe);

    expect(() => recipeRepository.add(recipe)).toThrowError(
      'Item with id "recipe-1" already exists',
    );
  });

  it("should reject invalid year ranges", () => {
    expect(() => recipeRepository.searchByYearRange(2025, 2020)).toThrowError(
      "Invalid year range",
    );
  });

  it("should reject empty step tag search", () => {
    expect(() => stepRepository.searchByTag("")).toThrowError(
      "Tag cannot be empty",
    );
  });

  it("should render a table through ConsoleTableRenderer", () => {
    const renderer = new ConsoleTableRenderer<Chef>();
    const spy = vi.spyOn(console, "table").mockImplementation(() => {});

    renderer.render([chef]);

    expect(spy).toHaveBeenCalledWith([chef]);
    spy.mockRestore();
  });
});