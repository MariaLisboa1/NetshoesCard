import { Component, OnInit, Input, Output } from "@angular/core";
import { ProductsService } from "../products.service";
import { ProductsItem } from "./products-item.model";
import { EventEmitter } from "events";
import { MenuController } from "@ionic/angular";
import { ToastController } from "@ionic/angular";

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

  constructor(
    private product: ProductsService,
    private menu: MenuController,
    public toastController: ToastController
  ) {}

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Your settings have been saved.",
      duration: 2000
    });
    toast.present();
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

  ngOnInit() {
    this.product
      .products()
      .subscribe(res => ((<any>this.prods) = res), err => console.log(err));
  }

  getTotalPrice() {
    return this.totalPrice;
  }

  items(): any[] {
    return this.product.items;
  }

  bad(): any[] {
    return <any>this.product.bag.length;
  }

  async addItem(item: any) {
    this.product.addItem(item);
    const toast = await this.toastController.create({
      message: "Produto adicionado com sucesso.",
      duration: 2000
    });
    toast.present();
  }

  clear() {
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

  // bagItemss(item: any) {
  //   let items = this.product.bagItems(item);
  //   console.log(items);

  //   return this.product.bagItems(item);
  // }
}
