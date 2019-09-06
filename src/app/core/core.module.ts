import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
// import { RouterModule } from "@angular/router";
// import { HomeComponent } from "./components/home/home.component";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    BrowserModule
    // RouterModule.forChild([
    //   {
    //     path: "",
    //     component: HomeComponent
    //   }
    // ])
  ],
  declarations: [],
  exports: []
})
export class CoreModule {}
