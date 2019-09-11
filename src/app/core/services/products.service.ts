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
    let foundItem = this.items.find(mItem => mItem.menuItem.id === item.id);
    if (foundItem) {
      this.increaseQty(foundItem);
    } else {
      this.items.push(new CartItem(item));
    }
    console.log(`Você adicionou o item ${item.title}`);

    this.storageLocal.saveItem("items", this.items);
    this.bag.push(new BagItem(item));
    this.storageLocal.saveItem("badge", this.bag);
  }

  increaseQty(item: CartItem) {
    item.quantity = item.quantity + 1;
  }

  decreaseQty(item: CartItem) {
    let find = this.items.filter(a => a.menuItem.id === item.menuItem.id);
    console.log(find);

    if (find.length > 0) {
      item.quantity = item.quantity - 1;
      find[0].quantity = find[0].quantity - 1;
      if (item.quantity === 0 && find[0].quantity === 0) {
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
    let getTotal = JSON.parse(localStorage.getItem("items"));

    return getTotal
      .map(item => item.menuItem.price * item.quantity)
      .reduce((prev, value) => prev + value, 0);
  }

  products() {
    return this.http.get(`${NETSHOES_API}/products`);
  }
}
