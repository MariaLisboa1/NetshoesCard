import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ProductsService } from "../products.service";
import { ProductsItem } from "./products-item.model";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  constructor(private product: ProductsService) {}
  prods;
  public totalPrice: number = 0.0;
  itemsInCart: Object[] = [];

  cart: ProductsItem;

  ngOnInit() {
    this.product
      .products()
      .subscribe(res => (this.prods = res), err => console.log(err));
  }

  add(products) {
    console.log(products);
  }

  updateTotalPrice(active: Boolean, pizzaPrice) {
    active ? (this.totalPrice += pizzaPrice) : (this.totalPrice -= pizzaPrice);
  }

  getTotalPrice() {
    return this.totalPrice;
  }

  addToCart(active: Boolean, id, pizza, description, price) {
    if (active == true) {
      this.cart.id = id;
      this.cart.title = pizza;
      this.cart.description = description;
      console.log("aqui");
    }
  }
}
