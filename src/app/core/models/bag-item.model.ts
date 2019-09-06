import { ProductsItem } from "./products-item.model";

export class BagItem {
  constructor(
    public menuItem: ProductsItem,
    public quantity: number = 1,
    public bagIems: number = 1
  ) {}

  value(): number {
    return this.bagIems + this.quantity;
  }
}
