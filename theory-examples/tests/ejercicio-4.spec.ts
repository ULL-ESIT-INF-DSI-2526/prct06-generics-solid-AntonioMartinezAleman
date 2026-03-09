import { describe, expect, it, vi } from "vitest";
import {
  BasicPrinter,
  MultiFunctionPrinter,
  printDocument,
  sendFax,
} from "../src/ejercicio-4/office-machines";

describe("Ejercicio 4 - Office machines", () => {
  it("should allow a basic printer to print", () => {
    const printer = new BasicPrinter();
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});

    printer.print("Report");

    expect(spy).toHaveBeenCalledWith("Printing:", "Report");
    spy.mockRestore();
  });

  it("should allow a multifunction printer to print", () => {
    const machine = new MultiFunctionPrinter();
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});

    machine.print("Invoice");

    expect(spy).toHaveBeenCalledWith("Printing:", "Invoice");
    spy.mockRestore();
  });

  it("should allow a multifunction printer to scan", () => {
    const machine = new MultiFunctionPrinter();

    expect(machine.scan("Contract")).toBe("Scanned: Contract");
  });

  it("should allow a multifunction printer to send fax", () => {
    const machine = new MultiFunctionPrinter();
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});

    machine.fax("Document");

    expect(spy).toHaveBeenCalledWith("Fax sent:", "Document");
    spy.mockRestore();
  });

  it("should allow sendFax to work with fax-capable devices only", () => {
    const machine = new MultiFunctionPrinter();
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});

    sendFax(machine, "Legal file");

    expect(spy).toHaveBeenCalledWith("Fax sent:", "Legal file");
    spy.mockRestore();
  });

  it("should allow printDocument to work with printers", () => {
    const printer = new BasicPrinter();
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});

    printDocument(printer, "Summary");

    expect(spy).toHaveBeenCalledWith("Printing:", "Summary");
    spy.mockRestore();
  });
});