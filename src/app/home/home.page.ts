import { Component, OnInit, Input, Output } from "@angular/core";
import { ProductsService } from "../products.service";
import { ProductsItem } from "./products-item.model";
import { EventEmitter } from "events";
import { MenuController } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  public prods: ProductsItem;
  public sizes: any[] = [];
  public totalPrice: number = 0.0;
  itemsInCart: Object[] = [];
  cart: ProductsItem;
  carro;

  @Input() menuItem: ProductsItem;
  @Output() add2 = new EventEmitter();

  constructor(private product: ProductsService, private menu: MenuController) {}

  openFirst() {
    this.menu.enable(true, "first");
    this.menu.open("first");
  }

  openEnd() {
    this.menu.open("end");
  }

  openCustom() {
    this.menu.enable(true, "custom");
    this.menu.open("custom");
  }

  ngOnInit() {
    this.product
      .products()
      .subscribe(res => ((<any>this.prods) = res), err => console.log(err));
  }

  updateTotalPrice(price) {
    this.totalPrice += price;
  }

  getTotalPrice() {
    return this.totalPrice;
  }

  addToCart(prods) {
    this.updateTotalPrice(prods.price);
    this.cart = prods;
    console.log("aqui");

    this.product.addToCart(this.cart);

    this.product.getCart().then(
      result => {
        this.carro = result;
      },
      erro => {
        console.log(erro);
      }
    );
  }

  clear(id) {
    this.product.clearCart(id);
  }

  //NOT STORAGE

  items(): any[] {
    return this.product.items;
  }

  addItem(item: any) {
    this.product.addItem(item);
  }

  clear2() {
    this.product.clear();
  }

  removeItem(item: any) {
    this.product.removeItem(item);
  }

  total(): number {
    return this.product.total();
  }
}
