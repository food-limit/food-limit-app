import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {AuthProvider} from "../providers/auth/auth";
import {ListFoodPage} from "../pages/list-food/list-food";

import {GOOGLE_APP_ID, ONE_SIGNAL_APP_ID} from "../config";
import {OneSignal} from "@ionic-native/onesignal";
import {ListPlacePage} from "../pages/list-place/list-place";
import {PlaceService} from "./providers/place.service";

@Component({
  templateUrl: 'app.html'
})
export class FoodLimitApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = null;

  pages: Array<{title: string, component: any, hidden: Function, icon: string}>;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private authProvider: AuthProvider,
              private _placeService: PlaceService,
              private oneSignal: OneSignal) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      statusBar.overlaysWebView(false)
      splashScreen.hide();
      this.configOneSignal();
    });

    this.pages = [
      { title: 'Gestion de mes foyers', component: ListPlacePage, hidden: () => true , icon: "logo-buffer"},
      { title: 'Gestion de mes aliments', component: ListFoodPage, hidden: () => this._placeService.placeIsSelected(), icon: "cart" }
    ];

    authProvider.authUser.subscribe(jwt => {
      if (jwt) {
        this.rootPage = ListPlacePage;
      }
      else {
        this.rootPage = LoginPage;
      }
    });

    authProvider.checkLogin();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.authProvider.logout();
  }

  private configOneSignal(){
    // init oneSignal
    this.oneSignal.startInit(ONE_SIGNAL_APP_ID, GOOGLE_APP_ID);

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    // this.oneSignal.handleNotificationReceived().subscribe(() => {
    //   // do something when notification is received
    // });
    //
    // this.oneSignal.handleNotificationOpened().subscribe(() => {
    //   // do something when a notification is opened
    // });

    this.oneSignal.endInit();
  }

}
