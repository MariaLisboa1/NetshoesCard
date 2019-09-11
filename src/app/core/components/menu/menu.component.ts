import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { ProductsService } from "../../services/products.service";
import { Toast } from "../../../shared/helpers/Toast/toast";
import { StorageLocal } from "../../../shared/helpers/StorageLocal/storageLocal";

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
    private toast: Toast,
    public storageLocal: StorageLocal
  ) {}

  ngOnInit() {}

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
    let getBadge = this.storageLocal.getItem("badge");
    return getBadge ? getBadge.length : 0;
  }

  items() {
    let getItems = this.storageLocal.getItem("items");
    const carts = getItems ? (this.cartItems = getItems) : [];

    return carts;
  }

  clear() {
    this.product.clear();
  }

  async removeItem(item: any) {
    this.product.decreaseQty(item);
    this.toast.emitToast("Item removido com sucesso.", 2000);

    this.items();
  }

  total(): any {
    return this.product.total();
  }

  promoc(): number {
    return this.total() / 10;
  }

  async add(a) {
    this.toast.emitToast("Compra finalizada com sucesso.", 2000);

    this.clear();
  }
}
