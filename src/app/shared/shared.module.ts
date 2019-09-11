import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ButtonComponent } from "./components/button/button.component";
import { Toast } from "./helpers/Toast/toast";

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  declarations: [ButtonComponent],
  exports: [
    ButtonComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  providers: [Toast]
})
export class SharedModule {}
