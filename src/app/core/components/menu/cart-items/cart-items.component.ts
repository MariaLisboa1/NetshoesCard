import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CartItem } from "src/app/core/models/cart-item.model";
// import { EventEmitter } from "events";

@Component({
  selector: "app-cart-items",
  templateUrl: "./cart-items.component.html",
  styleUrls: ["./cart-items.component.scss"]
})
export class CartItemsComponent implements OnInit {
  @Input() item;
  // @Input() availableSizes;
  @Output() removeItem = new EventEmitter();
  // @Input() quantity;
  // @Output() value = new EventEmitter<CartItem>();
  // @Input() currencyId;

  constructor() {}

  ngOnInit() {}

  emitRemove(item: any) {
    this.removeItem.emit(item);
  }
}
