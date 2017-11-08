import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {FoodLimitApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {LoginPage} from "../pages/login/login";
import {SignupPage} from "../pages/signup/signup";
import {CustomFormsModule} from 'ng2-validation'
import {Storage, IonicStorageModule} from "@ionic/storage";
import {JwtHelper, AuthConfig, AuthHttp} from "angular2-jwt";
import {Http, HttpModule, RequestOptions} from "@angular/http";
import {AuthProvider} from "../providers/auth/auth";
import { AppHeaderComponent } from './components/app-header/app-header.component';
import {ListFoodPage} from "../pages/list-food/list-food";
import {FoodService} from "./providers/food.service";

export function authHttpServiceFactory(http: Http, options: RequestOptions, storage: Storage) {
  const authConfig = new AuthConfig({
    tokenGetter: (() => storage.get('jwt')),
  });
  return new AuthHttp(authConfig, http, options);
}

@NgModule({
  declarations: [
    FoodLimitApp,
    AppHeaderComponent,
    HomePage,
    ListFoodPage,
    LoginPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(FoodLimitApp),
    IonicStorageModule.forRoot(),
    CustomFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    FoodLimitApp,
    HomePage,
    ListFoodPage,
    LoginPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    JwtHelper, {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions, Storage]
    },
    FoodService,
    BarcodeScanner
  ],
})
export class AppModule {
}
