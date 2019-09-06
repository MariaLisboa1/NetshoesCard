import { ProductsItem } from "./products-item.model";

export class CartItem {
  constructor(public menuItem: ProductsItem, public quantity: number = 1) {}

  value(): number {
    return this.menuItem.price * this.quantity;
  }
}
