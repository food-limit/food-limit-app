import {Component} from '@angular/core';
import {LoadingController, NavController, ToastController} from 'ionic-angular';
import {SignupPage} from "../signup/signup";
import {AuthProvider} from "../../providers/auth/auth";
import "rxjs/add/operator/finally";
import {OneSignal} from "@ionic-native/onesignal";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(private readonly navCtrl: NavController,
              private readonly loadingCtrl: LoadingController,
              private readonly authProvider: AuthProvider,
              private readonly toastCtrl: ToastController,
              private oneSignal: OneSignal) {
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }

  login(value: any) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Connexion ...'
    });

    loading.present();

    this.authProvider
      .login(value)
      .finally(() => loading.dismiss())
      .subscribe(
        () => {},
        err => this.handleError(err));
  }

  handleError(error: any) {
    let message: string;
    if (error.status && error.status === 401) {
      message = 'Connexion échoué';
    } else {
      message = `Unexpected error: ${error.statusText}`;
    }

    const toast = this.toastCtrl.create({
      message,
      duration: 5000,
      position: 'bottom'
    });

    toast.present();
  }

}
