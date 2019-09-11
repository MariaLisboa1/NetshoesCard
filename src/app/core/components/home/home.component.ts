import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";

import { ProductsItem } from "../../models/products-item.model";
import { ProductsService } from "../../services/products.service";
import { Toast } from "src/app/shared/helpers/Toast/toast";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  public prods: ProductsItem;
  cart;
  title: string = "Adicionar no Carrinho";

  constructor(
    private product: ProductsService,
    public alertController: AlertController,
    private toast: Toast
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    return this.product
      .products()
      .subscribe(res => ((<any>this.prods) = res), this.presentAlert);
  }

  async add(item: any) {
    let getSelect = (<HTMLInputElement>document.getElementById(item.id)).value;

    this.cart = item;

    item.availableSizes = [];
    item.availableSizes.push(getSelect);
    this.product.addItem(item);

    this.toast.emitToast("Produto adicionado com sucesso.", 2000);
  }

  select(dados) {
    return document
      .getElementById(`${dados.id}-comprar`)
      .removeAttribute("disabled");
  }

  presentAlert = async () => {
    const alert = await this.alertController.create({
      header: "Erro",
      message: "Ocorreu um erro, por favor tente mais tarde.",
      buttons: ["OK"]
    });
    await alert.present();
  };
}
