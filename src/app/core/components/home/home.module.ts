import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CoreModule } from "../../core.module";
import { HomeComponent } from "./home.component";
import { HomeItemsComponent } from "./home-items/home-items.component";
@NgModule({
  imports: [
    CoreModule,
    RouterModule.forChild([
      {
        path: "",
        component: HomeComponent
      }
    ])
  ],
  declarations: [HomeComponent, HomeItemsComponent]
})
export class HomeComponentModule {}
