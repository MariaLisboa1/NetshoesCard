import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../products.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  constructor(private product: ProductsService) {}
  prods;

  ngOnInit() {
    this.product
      .products()
      .subscribe(res => (this.prods = res), err => console.log(err));
  }
}
