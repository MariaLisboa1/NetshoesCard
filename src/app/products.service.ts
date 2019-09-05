import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { ProductsItem } from "./home/products-item.model";
import { CartItem } from "./home/cart-item.model";
import { NETSHOES_API } from "./app.api";

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  ProdsItems: any[];
  items: CartItem[] = [];

  constructor(private http: HttpClient, private storage: Storage) {
    this.storage.get("prods").then(value => {
      if (value == null) {
        this.ProdsItems = [];
      } else {
        this.ProdsItems = value;
      }
    });
  }

  clear() {
    this.items = [];
  }

  addItem(item: ProductsItem) {
    let foundItem = this.items.find(mItem => mItem.menuItem.id === item.id);
    if (foundItem) {
      this.increaseQty(foundItem);
    } else {
      this.items.push(new CartItem(item));
    }
    console.log(`Você adicionou o item ${item.title}`);
  }

  increaseQty(item: CartItem) {
    item.quantity = item.quantity + 1;
  }

  decreaseQty(item: CartItem) {
    item.quantity = item.quantity - 1;
    if (item.quantity === 0) {
      this.removeItem(item);
    }
  }

  removeItem(item: CartItem) {
    this.items.splice(this.items.indexOf(item), 1);
    console.log(`Você removeu o item ${item.menuItem.title}`);
  }

  total(): number {
    return this.items
      .map(item => item.value())
      .reduce((prev, value) => prev + value, 0);
  }

  //STORAGE

  getCart(): Promise<any> {
    return this.storage.get("prods");
  }

  addToCart(item: any): Promise<any> {
    this.ProdsItems.push(item);

    return this.storage.set("prods", this.ProdsItems);
  }

  clearCart(id): Promise<any> {
    this.ProdsItems = [];
    return this.storage.remove("prods");
  }

  products() {
    return this.http.get(`${NETSHOES_API}/products`);
  }
}
