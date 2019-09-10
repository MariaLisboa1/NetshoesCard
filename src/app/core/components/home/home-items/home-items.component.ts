import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-home-items",
  templateUrl: "./home-items.component.html",
  styleUrls: ["./home-items.component.scss"]
})
export class HomeItemsComponent implements OnInit {
  @Input() products;

  @Output() select = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  emitSelect(data) {
    this.select.emit(data);
  }
}
