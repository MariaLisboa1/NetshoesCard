import { Component, OnInit } from "@angular/core";
import { MenuController, ToastController } from "@ionic/angular";
import { ProductsService } from "../../services/products.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent implements OnInit {
  cart;

  constructor(
    private menu: MenuController,
    private product: ProductsService,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    console.log(JSON.parse(localStorage.getItem("products")));

    if (JSON.parse(localStorage.getItem("products"))) {
      // this.product.items = JSON.parse(localStorage.getItem("products"));
    }
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

  items(): any[] {
    // localStorage.setItem("prods", JSON.stringify(this.product.items));
    return this.product.items;
  }

  clear() {
    localStorage.removeItem("products");
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
}
