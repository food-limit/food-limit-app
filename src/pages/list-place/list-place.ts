import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {PlaceService} from "../../app/providers/place.service";
import {Place} from "../../app/model/place.model";
import {ListFoodPage} from "../list-food/list-food";

/**
 * Generated class for the ListPlacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-place',
  templateUrl: 'list-place.html',
})
export class ListPlacePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private _placeService: PlaceService) {
    this._placeService.loadPlaces().subscribe();
  }

  public selectPlace(place: Place): void {
    this._placeService.selectedPlace = place;
    this.navCtrl.setRoot(ListFoodPage);
  }
}
