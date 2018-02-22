import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {PlaceService} from "../../app/providers/place.service";
import {Place} from "../../app/model/place.model";

@IonicPage()
@Component({
  selector: 'page-edit-place',
  templateUrl: 'edit-place.html',
})
export class EditPlacePage {

  private _place: Place;
  private _callback: Function;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, private _placeService: PlaceService) {

  }

  ionViewDidLoad() {
    if(this.navParams.get('id')) {
      this._callback = this.navParams.get('callback');
      this._placeService.getPlace(this.navParams.get('id'))
        .subscribe(res => {
          this._place = res;
        });
    }
  }

  public _updatePlace(place: Place): void {
    this._place = Object.assign(new Place(), {
      id: this._place.id,
      name: this._place.name
    });
    this._placeService.updatePlace(this._place)
      .subscribe(res => {
        this._callback().then(() => this.navCtrl.pop());
      });
  }

}
