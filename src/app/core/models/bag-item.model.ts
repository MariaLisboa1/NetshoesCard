import { ProductsItem } from "./products-item.model";

export class BagItem {
  constructor(
    public menuItem: ProductsItem,
    public quantity: number = 0,
    public bagItems: number = 0
  ) {}

  value(): number {
    return this.bagItems + this.quantity;
  }
}
