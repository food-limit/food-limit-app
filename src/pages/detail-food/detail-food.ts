import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {Food} from "../../app/model/food.model";
import {FoodService} from "../../app/providers/food.service";

/**
 * Generated class for the DetailFoodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-food',
  templateUrl: 'detail-food.html',
})
export class DetailFoodPage {

  private _food: Food;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, private _foodService: FoodService) {

  }

  ionViewDidLoad() {
    if(this.navParams.get('id')) {
      this._food = this._foodService.getFood(this.navParams.get('id'));
    }
  }

  private _deleteFood(food: Food): void {
    this._foodService.deleteFood(this._food);
    this.viewCtrl.dismiss();
  }

  private _editFood(food: Food): void {
    this.navCtrl.push("EditFoodPage", {
      'id': food.id
    });
  }

}
