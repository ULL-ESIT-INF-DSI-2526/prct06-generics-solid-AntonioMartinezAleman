import { Order } from "./order";

/**
 * interfaz que hace metodo obligatorio para los console.log
 */
export interface Observer {
  update(order: Order): void;
}