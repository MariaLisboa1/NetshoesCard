import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ProductsItem } from "../models/products-item.model";
import { NETSHOES_API } from "../../app.api";
import { CartItem } from "../models/cart-item.model";
import { BagItem } from "../models/bag-item.model";
import { StorageLocal } from "src/app/shared/helpers/StorageLocal/storageLocal";

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  ProdsItems: any[];
  items: CartItem[] = [];
  bag: BagItem[] = [];

  constructor(private http: HttpClient, public storageLocal: StorageLocal) {}

  clear() {
    this.items = [];
    this.bag = [];
    this.storageLocal.saveItem("items", this.items);
    this.storageLocal.saveItem("badge", this.bag);
  }

  async addItem(item: ProductsItem) {
    const foundItem = this.items.find(({ menuItem: { id } }) => id === item.id);
    const cartItem = new CartItem(item);
    const bagItem = new BagItem(item);
    foundItem ? this.increaseQty(foundItem) : this.items.push(cartItem);
    this.bag.push(bagItem);
    this.storageLocal.saveItem("items", this.items);
    this.storageLocal.saveItem("badge", this.bag);
  }

  increaseQty(item: CartItem) {
    item.quantity += 1;
  }

  decreaseQty(item: CartItem) {
    let [find] = this.items.filter(
      ({ menuItem: { id } }) => id === item.menuItem.id
    );
    if (find) {
      item.quantity -= 1;
      find.quantity -= 1;
      if (item.quantity === 0 && find.quantity === 0) {
        this.removeItem(item);
      }
    }
    this.bag.splice(this.items.indexOf(item), 1);

    
    this.storageLocal.saveItem("badge", this.bag);
    this.storageLocal.saveItem("items", this.items);
  }

  removeItem(item: CartItem) {
    this.items.splice(this.items.indexOf(item), 1);
    this.bag.splice(this.items.indexOf(item), 1);

    console.log(`Você removeu o item ${item.menuItem.title}`);
  }

  total(): number {
    let getTotal = this.storageLocal.getItem("items");
    return getTotal
      .map(({ menuItem }) => menuItem.price * menuItem.quantity)
      .reduce((prev, value) => prev + value, 0);
  }

  products() {
    return this.http.get(`${NETSHOES_API}/products`);
  }
}
