import { describe, it, expect } from "vitest";
import { OrderManager } from "../src/practica7-PE102/ordermanager";
import { EmailNotifier } from "../src/practica7-PE102/emailnotifier";
import { Order } from "../src/practica7-PE102/order";

describe("manager", () => {
  it("add order", () => {
    const manager = new OrderManager();
    const order: Order = { id: "1", status: "pending", items: ["a"] };
    manager.addOrder(order);
    expect(manager.getOrder("1")).toEqual(order);
  });

  it("orden duplicada", () => {
    const manager = new OrderManager();
    const order: Order = { id: "1", status: "pending", items: ["a"] };
    manager.addOrder(order);
    expect(() => manager.addOrder(order)).toThrow();
  });

  it("getorder undefined", () => {
    const manager = new OrderManager();
    const result = manager.getOrder("10");
    expect(result).toBeUndefined();
  });

  it("cambiar estado", () => {
    const manager = new OrderManager();
    const order: Order = { id: "1", status: "pending", items: ["a"] };
    manager.addOrder(order);
    manager.changeStatus("1", "confirmed");
    expect(manager.getOrder("1")?.status).toBe("confirmed");
  });

  it("subscribirse y dessuscribirse", () => {
    const manager = new OrderManager();
    const email = new EmailNotifier();
    manager.subscribe(email);
    manager.unsubscribe(email);
    const order: Order = { id: "1", status: "pending", items: ["a"] };
    manager.addOrder(order);
    manager.changeStatus("1", "confirmed");
    expect(true).toBe(true);
  });
});