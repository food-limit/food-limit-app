import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {FoodLimitApp} from './app.component';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {LoginPage} from "../pages/login/login";
import {SignupPage} from "../pages/signup/signup";
import {CustomFormsModule} from 'ng2-validation'
import {IonicStorageModule, Storage} from "@ionic/storage";
import {AuthConfig, AuthHttp, JwtHelper} from "angular2-jwt";
import {Http, HttpModule, RequestOptions} from "@angular/http";
import {AuthProvider} from "../providers/auth/auth";
import {AppHeaderComponent} from './components/app-header/app-header.component';
import {ListFoodPage} from "../pages/list-food/list-food";
import {FoodService} from "./providers/food.service";
import {SpeechRecognition} from "@ionic-native/speech-recognition";
import {OneSignal} from "@ionic-native/onesignal";
import {PlaceService} from "./providers/place.service";
import {ListPlacePage} from "../pages/list-place/list-place";

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
    LoginPage,
    ListPlacePage,
    ListFoodPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(FoodLimitApp, {
      statusbarPadding: false
    }),
    IonicStorageModule.forRoot(),
    CustomFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppHeaderComponent,
    FoodLimitApp,
    ListPlacePage,
    ListFoodPage,
    LoginPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    SpeechRecognition,
    JwtHelper, {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions, Storage]
    },
    PlaceService,
    FoodService,
    BarcodeScanner,
    OneSignal
  ],
})
export class AppModule {
}
