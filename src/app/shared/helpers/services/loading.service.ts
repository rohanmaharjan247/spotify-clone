import { Injectable } from '@angular/core';
import { LoadingController, LoadingOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  modalInstance: HTMLIonLoadingElement;
  loaderPresent = false;

  constructor(private loadingCtrl: LoadingController) {}

  currentInstance() {
    return this.modalInstance;
  }

  async presentLoading(loadingOptions?: LoadingOptions) {
    const options: LoadingOptions = loadingOptions ?? {
      animated: true,
      message: 'Please wait...',
      id: 'loader',

      duration: 5000
    };
    await this.loadingCtrl
      .create(options)
      .then((loader: HTMLIonLoadingElement) => {
        this.modalInstance = loader;
      });

    await this.modalInstance.present().then(async () => {
      if (!this.loaderPresent) {
        await this.dismiss();
      }
    });
  }

  async showLoader(loadingOptions?: LoadingOptions) {
    if (!this.loaderPresent) {
      this.loaderPresent = true;
      await this.presentLoading(loadingOptions);
    }
    return this.loaderPresent;
  }

  async dismiss() {
    this.loaderPresent = false;
    if (this.modalInstance) {
      this.modalInstance.dismiss();
      this.modalInstance = null;
    } else {
      this.loadingCtrl.dismiss().catch((error) => console.error(error));
    }

    return this.loaderPresent;
  }
}
