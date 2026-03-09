/**
 * Capacidad de impresión.
 */
export interface Printer {
  /**
   * Imprime un documento.
   * @param doc Documento a imprimir.
   */
  print(doc: string): void;
}

/**
 * Capacidad de escaneo.
 */
export interface Scanner {
  /**
   * Escanea un documento.
   * @param doc Documento a escanear.
   * @returns Resultado del escaneo.
   */
  scan(doc: string): string;
}

/**
 * Capacidad de envío de fax.
 */
export interface Fax {
  /**
   * Envía un documento por fax.
   * @param doc Documento a enviar.
   */
  fax(doc: string): void;
}

/**
 * Impresora básica.
 */
export class BasicPrinter implements Printer {
  /**
   * Imprime un documento.
   * @param doc Documento a imprimir.
   */
  print(doc: string): void {
    console.log("Printing:", doc);
  }
}

/**
 * Impresora multifunción.
 */
export class MultiFunctionPrinter implements Printer, Scanner, Fax {
  /**
   * Imprime un documento.
   * @param doc Documento a imprimir.
   */
  print(doc: string): void {
    console.log("Printing:", doc);
  }

  /**
   * Escanea un documento.
   * @param doc Documento a escanear.
   * @returns Resultado del escaneo.
   */
  scan(doc: string): string {
    return `Scanned: ${doc}`;
  }

  /**
   * Envía un documento por fax.
   * @param doc Documento a enviar.
   */
  fax(doc: string): void {
    console.log("Fax sent:", doc);
  }
}

/**
 * Cliente que solo necesita capacidad de fax.
 *
 * @param machine Dispositivo con capacidad de fax.
 * @param doc Documento a enviar.
 */
export function sendFax(machine: Fax, doc: string): void {
  machine.fax(doc);
}

/**
 * Cliente que solo necesita capacidad de impresión.
 *
 * @param machine Dispositivo con capacidad de impresión.
 * @param doc Documento a imprimir.
 */
export function printDocument(machine: Printer, doc: string): void {
  machine.print(doc);
}