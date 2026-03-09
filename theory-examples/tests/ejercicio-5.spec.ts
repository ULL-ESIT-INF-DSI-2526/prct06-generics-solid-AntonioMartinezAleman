import { describe, expect, it, vi } from "vitest";
import {
  InMemoryUserRepository,
  MySqlUserRepository,
  UserRepository,
  UserService,
} from "../src/ejercicio-5/user-service";

describe("Ejercicio 5 - User service", () => {
  it("should return the user name in uppercase using an in-memory repository", () => {
    const repo = new InMemoryUserRepository([
      { id: "1", name: "Ada" },
      { id: "2", name: "Grace" },
    ]);

    const service = new UserService(repo);

    expect(service.getUserName("1")).toBe("ADA");
  });

  it("should throw an error when the user does not exist", () => {
    const repo = new InMemoryUserRepository([]);
    const service = new UserService(repo);

    expect(() => service.getUserName("99")).toThrowError("User not found");
  });

  it("should throw an error when the id is empty", () => {
    const repo = new InMemoryUserRepository([{ id: "1", name: "Ada" }]);
    const service = new UserService(repo);

    expect(() => service.getUserName("")).toThrowError(
      "User id cannot be empty",
    );
  });

  it("should work with a MySQL repository implementation", () => {
    const repo = new MySqlUserRepository();
    const service = new UserService(repo);

    expect(service.getUserName("123")).toBe("ADA");
  });

  it("should allow using any repository that implements the abstraction", () => {
    class MockUserRepository implements UserRepository {
      findById(id: string) {
        if (id === "42") {
          return { id: "42", name: "Linus" };
        }
        return null;
      }
    }

    const service = new UserService(new MockUserRepository());

    expect(service.getUserName("42")).toBe("LINUS");
  });

  it("should call the MySQL repository when using that implementation", () => {
    const repo = new MySqlUserRepository();
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const service = new UserService(repo);

    service.getUserName("1");

    expect(spy).toHaveBeenCalledWith("Querying MySQL...");
    spy.mockRestore();
  });
});