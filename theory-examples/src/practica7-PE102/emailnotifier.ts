import { Observer } from "./observer.js";
import { Order } from "./order.js";

/**
 * cada vez que se hace notify se imprime esto por pantalla
 */
export class EmailNotifier implements Observer {
  update(order: Order): void {
    console.log(`Email enviado al cliente para el pedido ${order.id} con estado ${order.status}`);
  }
}