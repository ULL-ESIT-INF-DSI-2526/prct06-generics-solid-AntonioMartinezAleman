/**
 * interaz que pide a las clases que la implementen dos funciones como minimo
 */
export interface Reproducible<T> {
  /**
   * datos de del elemento
   */
  data(): T;
  /**
   * duracion en segundos del elemento
   */
  duration(): number;
}