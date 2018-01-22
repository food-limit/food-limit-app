import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {AuthProvider} from "../providers/auth/auth";
import {ListFoodPage} from "../pages/list-food/list-food";

@Component({
  templateUrl: 'app.html'
})
export class FoodLimitApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = null;

  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private authProvider: AuthProvider) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      statusBar.overlaysWebView(false)
      splashScreen.hide();
    });

    this.pages = [
      { title: 'Gestion de mes aliments', component: ListFoodPage }
    ];

    authProvider.authUser.subscribe(jwt => {
      if (jwt) {
        this.rootPage = ListFoodPage;
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

}
