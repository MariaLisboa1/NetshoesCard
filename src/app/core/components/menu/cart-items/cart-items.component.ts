import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-cart-items",
  templateUrl: "./cart-items.component.html",
  styleUrls: ["./cart-items.component.scss"]
})
export class CartItemsComponent implements OnInit {
  @Input() item;
  @Output() removeItem = new EventEmitter();

  constructor() {}

  ngOnInit() {
  }

  emitRemove(item: any) {
    this.removeItem.emit(item);
  }
}
