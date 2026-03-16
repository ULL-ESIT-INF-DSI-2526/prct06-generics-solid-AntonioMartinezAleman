import { describe, it, expect } from "vitest";
import { OrderManager } from "../src/practica7-PE102/ordermanager";
import { EmailNotifier } from "../src/practica7-PE102/emailnotifier";
import { InventoryUpdater } from "../src/practica7-PE102/inventoryupdater";
import { Order } from "../src/practica7-PE102/order";

describe("observer system", () => {
  it("notify observers", () => {
    const manager = new OrderManager();
    const email = new EmailNotifier();
    const inventory = new InventoryUpdater();
    manager.subscribe(email);
    manager.subscribe(inventory);
    const order: Order = { id: "1", status: "pending", items: ["a"] };
    manager.addOrder(order);
    manager.changeStatus("1", "shipped");
    expect(manager.getOrder("1")?.status).toBe("shipped");
  });
});