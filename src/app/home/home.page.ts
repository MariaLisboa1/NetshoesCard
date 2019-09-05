import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../products.service";
import { ProductsItem } from "./products-item.model";
import { MenuController, AlertController } from "@ionic/angular";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  public prods: ProductsItem;
  public totalPrice: number = 0.0;
  cart;

  constructor(
    private product: ProductsService,
    private menu: MenuController,
    public toastController: ToastController,
    public alertController: AlertController
  ) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: "Alert",
      subHeader: "Subtitle",
      message: "This is an alert message.",
      buttons: ["OK"]
    });

    await alert.present();
  }

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
      .subscribe(res => ((<any>this.prods) = res), err => this.presentAlert());

    this.cart = JSON.parse(localStorage.getItem("prods"));
    // if (this.cart) {
    //   this.items(this.cart);
    // } else {
    //   this.items([]);
    // }
    // this.items([]);
  }

  select(dados) {
    document.getElementById(`${dados.id}-comprar`).removeAttribute("disabled");
  }

  items(): any[] {
    localStorage.setItem("prods", JSON.stringify(this.product.items));
    return this.product.items;
  }

  items1(cart): any[] {
    console.log(cart);

    return cart;
  }

  bad(): any[] {
    return <any>this.product.bag.length;
  }

  async addItem(item: any) {
    // let getSelect = (<HTMLInputElement>document.getElementById(item.id)).value;
    // this.cart = item;
    // console.log(this.product.addToCart(this.cart));

    // item.availableSizes = [];
    // item.availableSizes.push(getSelect);

    this.product.addItem(item);
    // console.log(this.product.addItem(item));

    // this.cart.push(item);

    // localStorage.setItem("products", this.cart);

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
}
