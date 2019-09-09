import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { MenuComponent } from "./components/menu/menu.component";
import { CartItemsComponent } from "./components/menu/cart-items/cart-items.component";
import { HomeItemsComponent } from "./components/home/home-items/home-items.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "menu",
        component: MenuComponent
      }
    ])
  ],
  declarations: [
    MenuComponent,
    CartItemsComponent,
    HomeComponent,
    HomeItemsComponent
  ],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule]
})
export class CoreModule {}
