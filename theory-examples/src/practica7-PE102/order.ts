/**
 * posibles estados de una orden, solo uno de estos
 */
export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered";

/**
 * typo order que tiene un id, un estado y una serie de items
 */
export type Order = {
  id: string;
  status: OrderStatus;
  items: string[];
};