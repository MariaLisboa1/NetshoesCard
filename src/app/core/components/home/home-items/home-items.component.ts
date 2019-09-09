import { Component, OnInit, Input, Output } from "@angular/core";
import { ProductsItem } from "src/app/core/models/products-item.model";

@Component({
  selector: "app-home-items",
  templateUrl: "./home-items.component.html",
  styleUrls: ["./home-items.component.scss"]
})
export class HomeItemsComponent implements OnInit {
  public prods: ProductsItem;
  @Input() products;

  constructor() {}

  ngOnInit() {}
}
