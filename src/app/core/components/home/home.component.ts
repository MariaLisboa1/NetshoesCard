import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";
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
  cartItems;
  title: string = "Adicionar no Carrinho";

  constructor(
    private product: ProductsService,
    public toastController: ToastController,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    return this.product
      .products()
      .subscribe(res => ((<any>this.prods) = res), err => this.presentAlert());
  }

  async add(item: any) {
    let getSelect = (<HTMLInputElement>document.getElementById(item.id)).value;

    this.cart = item;

    item.availableSizes = [];
    item.availableSizes.push(getSelect);
    this.product.addItem(item);
    this.addBd(item);
    // localStorage.setItem("products", JSON.stringify(this.cart));
    // this.getProducts();
    // localStorage.setItem("products", this.cart);

    const toast = await this.toastController.create({
      message: "Produto adicionado com sucesso.",
      duration: 2000
    });
    toast.present();
  }

  async addBd(item: ProductsItem) {
    this.product
      .addBd(item)
      .subscribe(res => console.log(res), err => console.log(err));
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
