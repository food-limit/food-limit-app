import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FoodService} from "../../app/providers/food.service";
import {Food} from "../../app/model/food.model";

@IonicPage()
@Component({
  selector: 'page-edit-food',
  templateUrl: 'edit-food.html',
})
export class EditFoodPage {

  private _food: Food;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _foodService: FoodService) {

  }

  ionViewDidLoad() {
    if(this.navParams.get('id')) {
      this._food = this._foodService.getFood(this.navParams.get('id'));
    }
    console.log("food",this._food);
  }

  private _updateFood(): void {
    console.log("update");
  }

}
