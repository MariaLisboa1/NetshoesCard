import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"]
})
export class ButtonComponent implements OnInit {
  @Output() add = new EventEmitter();
  @Input() products;
  @Input() title;
  disabled: string = "disabled";

  constructor() {}

  ngOnInit() {}

  emitAdd(item) {
    this.add.emit(item);
  }
}
