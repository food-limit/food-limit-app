import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {ReplaySubject, Observable} from "rxjs";
import {Storage} from "@ionic/storage";
import {JwtHelper, AuthHttp} from "angular2-jwt";
import {ONE_SIGNAL_KEY_TAG, SERVER_URL} from "../../config";
import {OneSignal} from "@ionic-native/onesignal";

@Injectable()
export class AuthProvider {

  authUser = new ReplaySubject<any>(1);

  constructor(private readonly http: Http,
              private readonly authHttp: AuthHttp,
              private readonly storage: Storage,
              private readonly jwtHelper: JwtHelper,
              private oneSignal: OneSignal) {
  }

  checkLogin() {
    this.storage.get('jwt').then(jwt => {
      if (jwt && !this.jwtHelper.isTokenExpired(jwt)) {
        this.authHttp.get(`${SERVER_URL}/authenticate`)
          .subscribe(() => this.authUser.next(jwt),
            (err) => this.removeStorage())
      }
      else {
        this.removeStorage();
      }
    });
  }

  removeStorage(){
    this.storage.remove('jwt').then(() => {
      this.authUser.next(null);
      this.oneSignal.deleteTag(ONE_SIGNAL_KEY_TAG);
    });
  }

  login(values: any): Observable<any> {
    return this.http.post(`${SERVER_URL}/login`, values)
      .map(response => response.text())
      .map(jwt => this.handleJwtResponse(jwt))
      .do(res => this.sendTagToOneSignal(values.username));
  }

  private sendTagToOneSignal(username: string){
    this.oneSignal.sendTag(ONE_SIGNAL_KEY_TAG, username);
  }

  logout() {
    this.removeStorage();
  }

  signup(values: any): Observable<any> {
    return this.http.post(`${SERVER_URL}/signup`, values)
      .map(response => response.text())
      .map(jwt => {
        if (jwt !== 'EXISTS') {
          return this.handleJwtResponse(jwt);
        }
        else {
          return jwt;
        }
      })
      .do(res => this.sendTagToOneSignal(values.username));
  }

  private handleJwtResponse(jwt: string) {
    return this.storage.set('jwt', jwt)
      .then(() => this.authUser.next(jwt))
      .then(() => jwt);
  }
}
