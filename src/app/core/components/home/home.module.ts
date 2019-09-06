import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CoreModule } from "../../core.module";
import { HomeComponent } from "./home.component";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule.forChild([
      {
        path: "",
        component: HomeComponent
      }
    ])
  ],
  declarations: [HomeComponent]
})
export class HomeComponentModule {}
