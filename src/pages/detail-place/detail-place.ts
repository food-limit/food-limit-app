import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {PlaceService} from "../../app/providers/place.service";
import {Place} from "../../app/model/place.model";

/**
 * Generated class for the DetailPlacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail-place',
  templateUrl: 'detail-place.html',
})
export class DetailPlacePage {

  private _place: Place;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, private _placeService: PlaceService) {

  }

  ionViewDidLoad() {
    this._loadPlace();
  }

  public deletePlace(place: Place): void {
    this._placeService.deletePlace(place.id);
    this.navCtrl.pop();
  }

  public editPlace(place: Place): void {
    this.navCtrl.push("EditPlacePage", {
      id: place.id,
      callback: this.refreshPlace.bind(this)
    });
  }

  private _loadPlace(): void {
    if(this.navParams.get('id')) {
      this._placeService.getPlace(this.navParams.get('id'))
        .subscribe(res => {
          this._place = res;
        });
    }
  }

  public refreshPlace(): Promise<void> {
    return new Promise((resolve, reject) => {
      this._loadPlace();
      resolve();
    })
  }

}
