import { Component, OnInit } from "@angular/core";
import { MenuController, AlertController } from "@ionic/angular";
import { ToastController } from "@ionic/angular";

import { ProductsItem } from "../../models/products-item.model";
import { ProductsService } from "../../services/products.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  public prods: ProductsItem;
  public totalPrice: number = 0.0;
  cart;

  constructor(
    private product: ProductsService,
    public toastController: ToastController,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.getProducts();
    // this.getProducts();
    // if (this.cart) {
    //   this.items(this.cart);
    // } else {
    //   this.items([]);
    // }
    // this.items([]);
  }

  getProducts() {
    return this.product
      .products()
      .subscribe(res => ((<any>this.prods) = res), err => this.presentAlert());
  }

  async addItem(item: any) {
    let getSelect = (<HTMLInputElement>document.getElementById(item.id)).value;
    // let getSizes = (<any>this.prods).find(e => e.id === item.id);
    // localStorage.setItem("sizes", JSON.stringify(getSizes));

    this.cart = item;

    item.availableSizes = [];
    item.availableSizes.push(getSelect);
    this.product.addItem(item);
    localStorage.setItem("products", JSON.stringify(this.cart));
    // this.getProducts();
    // localStorage.setItem("products", this.cart);

    const toast = await this.toastController.create({
      message: "Produto adicionado com sucesso.",
      duration: 2000
    });
    toast.present();
  }

  select(dados) {
    return document
      .getElementById(`${dados.id}-comprar`)
      .removeAttribute("disabled");
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: "Erro",
      message: "Ocorreu um erro, por favor tente mais tarde.",
      buttons: ["OK"]
    });

    await alert.present();
  }
}
