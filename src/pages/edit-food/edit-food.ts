import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {FoodService} from "../../app/providers/food.service";
import {Food} from "../../app/model/food.model";

@IonicPage()
@Component({
  selector: 'page-edit-food',
  templateUrl: 'edit-food.html',
})
export class EditFoodPage {

  private _food: Food;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, private _foodService: FoodService) {

  }

  ionViewDidLoad() {
    if(this.navParams.get('id')) {
      this._food = this._foodService.getFood(this.navParams.get('id'));
    }
  }

  private _updateFood(food: Food): void {
    this._foodService.updateFood(food);
    this.viewCtrl.dismiss();
  }

}
