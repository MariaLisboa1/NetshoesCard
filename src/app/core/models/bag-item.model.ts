import { ProductsItem } from "./products-item.model";

export class BagItem {
  constructor(
    public menuItem: ProductsItem,
    public quantity: number = 0,
    public bagIems: number = 0
  ) {}

  value(): number {
    return this.bagIems + this.quantity;
  }
}
