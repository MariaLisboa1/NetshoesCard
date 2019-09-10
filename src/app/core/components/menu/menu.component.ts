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
    // let get = JSON.parse(localStorage.getItem("items"));
    // if (get) {
    //   this.cartItems = get;
    // } else {
    //   this.cartItems = [];
    // }
    this.cartItems = JSON.parse(localStorage.getItem("items"));

    console.log(this.cartItems);
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
    return <any>this.product.bag.length;
  }

  items() {
    // return this.product.items;
    return this.cartItems;
  }

  clear() {
    // localStorage.removeItem("products");
    this.product.clear();
  }

  async removeItem(item: any) {
    this.product.removeItem(item);

    const toast = await this.toastController.create({
      message: "Item removido com sucesso.",
      duration: 2000
    });
    toast.present();
  }

  total(): number {
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
  }
}
