import { Component, OnInit } from "@angular/core";
import { MenuController, ToastController } from "@ionic/angular";
import { ProductsService } from "../../services/products.service";
import { CartItem } from "../../models/cart-item.model";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent implements OnInit {
  cart;
  title: string = "Comprar";
  cartItems;

  constructor(
    private menu: MenuController,
    private product: ProductsService,
    public toastController: ToastController
  ) {}

  ngOnInit() {

  }

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

  badge(): any[] {
    let getBadge = JSON.parse(localStorage.getItem("badge"));

    if (getBadge) {
      return getBadge.length;
    } else {
      getBadge = 0;
      return getBadge;
    }
  }

  items() {
    let getItems = JSON.parse(localStorage.getItem("items"));

    if (getItems) {
      this.cartItems = getItems;
    } else {
      this.cartItems = [];
    }
    return this.cartItems;
  }

  clear() {
    this.product.clear();
  }

  async removeItem(item: any) {
    this.product.decreaseQty(item);

    const toast = await this.toastController.create({
      message: "Item removido com sucesso.",
      duration: 2000
    });
    toast.present();
    this.items();
  }

  total(): any {
    return this.product.total();
  }

  promoc(): number {
    return this.total() / 10;
  }

  async add() {
    const toast = await this.toastController.create({
      message: "Compra finalizada com sucesso.",
      duration: 2000
    });
    toast.present();

    this.clear();
  }
}
