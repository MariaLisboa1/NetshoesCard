import { ToastController } from "@ionic/angular";

export class Toast {
  constructor(private toastController: ToastController) {}

  async emitToast(message, time) {
    const toast = await this.toastController.create({
      message: message,
      duration: time
    });
    return toast.present();
  }
}
