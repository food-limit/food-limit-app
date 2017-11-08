import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HomePage} from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {AuthProvider} from "../providers/auth/auth";
import { ListPage } from '../pages/list/list';
import { ManageFoodPage } from '../pages/manage-food/manage-food';

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
              authProvider: AuthProvider) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Gestion de mes aliments', component: ManageFoodPage }
    ];

    authProvider.authUser.subscribe(jwt => {
      if (jwt) {
        this.rootPage = HomePage;
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
}
