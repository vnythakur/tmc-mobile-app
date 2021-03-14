import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  public loading: any;


  constructor(
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private iab: InAppBrowser
  ) { }
  

  call(mobile) {
    if (!mobile) {
      return;
    }
    const browser = this.iab.create(`tel:${mobile}`, '_system');
  }

  inviteOnWhatsApp(mobile, text = '') {
    this.iab.create(`whatsapp://send?phone=${mobile}&text=${text}`, '_system');
  }

  async showToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
      mode: 'md'
    });
    toast.present();
  }

  async showLoader(msg?: any) {
    this.loading = await this.loadingCtrl.getTop();

    if (!this.loading) {
      this.loading = await this.loadingCtrl.create({
        animated: true,
        spinner: 'crescent',
        message: msg === '' ? 'Please wait...' : msg,
        translucent: true,
        // cssClass: 'http-loading',
        keyboardClose: true
      });
      return await this.loading.present();
    }
  }

  async hideLoader() {
    this.loading = await this.loadingCtrl.getTop();

    if (this.loading) {
      return await this.loading.dismiss({
        leaveAnimation: true
      });
    }
  }
}
