import { Component, OnInit, Input, Output } from '@angular/core';
import { ProductsService } from "../products.service";
import { EventEmitter } from 'events';

@Component({
  selector: 'app-card-items',
  templateUrl: './card-items.component.html',
  styleUrls: ['./card-items.component.scss'],
})
export class CardItemsComponent implements OnInit {
  allItems;
  @Input() product;
  @Output() notify = new EventEmitter();

  constructor() {
  
    
   }

  ngOnInit() {
    // this.allItems
    // this.product.getCart().catch(() => {
    //   console.log();
      
    // })
    // console.log(this.allItems);
    
  }


}
