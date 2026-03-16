import { Observer } from "./observer.js";
import { Order } from "./order.js";

/**
 * cada vez que se hace notify se imprime esto por pantalla
 */
export class InventoryUpdater implements Observer {
  update(order: Order): void {
    console.log(`Inventario actualizado para el pedido ${order.id}`);
  }
}