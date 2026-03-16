import { Observable } from "./observable";
import { Observer } from "./observer";
import { Order, OrderStatus } from "./order";

/**
 * clase que gestiona dos arrays, suscritos y ordenes
 */
export class OrderManager implements Observable {
  private observers: Observer[] = [];
  private orders: Order[] = [];
  /**
   * funcion que añade un suscriptor al array
   * @param observer 
   */
  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }
  /**
   * funcion que elimina un suscriptor del array
   * @param observer
   */
  unsubscribe(observer: Observer): void {
    const indice = this.observers.indexOf(observer);
    this.observers.splice(indice,1);
  }
  /**
   * 
   * @param id 
   * @returns o la orden si la encuentra o undefined si no
   */
  getOrder(id: string): Order | undefined {
    for (let i = 0; i < this.orders.length; i++) {
      if (this.orders[i].id === id) {
        return this.orders[i];
      }
    }
    return undefined;
  }
  /**
   * añade una orden al array de ordenes
   * @param order 
   */
  addOrder(order: Order): void {
    if (this.getOrder(order.id)) {
      throw new Error("El pedido con id " + order.id + " ya existe");
    }
    this.orders.push(order);
  }
  
  /**
   * 
   * @param orderId 
   * @returns no devulve nada pero llama a la funcion update que si muestra un mensaje por pantalla
   */
  notify(orderId: string): void {
    const order = this.getOrder(orderId);
    if (!order) {
      return;
    }
    for (let i = 0; i < this.observers.length; i++) {
      this.observers[i].update(order);
    }
  }
  
  /**
   * cambia el estado si la orden existe y es un nuevo estado, ademas notifica
   * @param id 
   * @param newStatus 
   * @returns no hace nada
   *  si la orden no existe o quieres cambiar el status al mismo que tenias antes,
   */
  changeStatus(id: string, newStatus: OrderStatus): void {
    const order = this.getOrder(id);
    if (!order) {
      return;
    } if (order.status === newStatus) {
      return;
    }
    order.status = newStatus;
    this.notify(id);
  }
}