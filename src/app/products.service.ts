import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ProductsItem } from "./home/products-item.model";
import { CartItem } from "./home/cart-item.model";
import { NETSHOES_API } from "./app.api";
import { BagItem } from "./home/bag-item.model";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  ProdsItems: any[];
  items: CartItem[] = [];
  bag: BagItem[] = [];

  constructor(private http: HttpClient, private storage: Storage) {}

  clear() {
    this.items = [];
  }

  addItem(item: ProductsItem) {
    this.bag.push(new BagItem(item));
    let foundItem = this.items.find(mItem => mItem.menuItem.id === item.id);
    if (foundItem) {
      this.increaseQty(foundItem);
    } else {
      this.items.push(new CartItem(item));
    }
    console.log(`Você adicionou o item ${item.title}`);
    // this.storage.set("prods", this.items);
  }

  // addToCart(item: any): Promise<any> {
  //   this.items.push(item);
  //   return this.storage.set("prods", this.items);
  // }

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

  products() {
    return this.http.get(`${NETSHOES_API}/products`);
  }
}
