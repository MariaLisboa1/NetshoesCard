import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ProductsItem } from "../models/products-item.model";
import { NETSHOES_API } from "../../app.api";
import { CartItem } from "../models/cart-item.model";
import { BagItem } from "../models/bag-item.model";

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  ProdsItems: any[];
  items: CartItem[] = [];
  bag: BagItem[] = [];

  constructor(private http: HttpClient) {}

  clear() {
    this.items = [];
    this.bag = [];
    this.localSto("items", this.items);
  }

  async addItem(item: ProductsItem) {
    let foundItem = this.items.find(mItem => mItem.menuItem.id === item.id);
    if (foundItem) {
      this.increaseQty(foundItem);
    } else {
      this.items.push(new CartItem(item));
    }
    console.log(`Você adicionou o item ${item.title}`);

    this.localSto("items", this.items);

    this.bag.push(new BagItem(item));
    this.localSto("badge", this.bag);
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
    this.localSto("badge", this.bag);
    this.localSto("items", this.items);
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

  localSto(name, item) {
    return localStorage.setItem(name, JSON.stringify(item));
  }
}
