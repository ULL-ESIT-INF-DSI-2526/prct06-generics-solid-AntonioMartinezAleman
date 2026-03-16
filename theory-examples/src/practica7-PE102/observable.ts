import { Observer } from "./observer";

/**
 * interfaz que define tres metodos, dos de suscripcion con una orden 
 * y otro que notifica segun el numero de id de una orden
 */
export interface Observable {
  subscribe(observer: Observer): void ;
  unsubscribe(observer: Observer): void;
  notify(IdOrden: string): void;
}