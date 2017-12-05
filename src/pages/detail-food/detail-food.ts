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
    this._loadFood();
  }

  public deleteFood(): void {
    this._foodService.deleteFood(this._food.id);
    this.navCtrl.pop();
  }

  public editFood(food: Food): void {
    this.navCtrl.push("EditFoodPage", {
      id: food.id,
      callback: this.refreshFood.bind(this)
    });
  }

  private _loadFood(): void {
    if(this.navParams.get('id')) {
      this._foodService.getFood(this.navParams.get('id'))
        .subscribe(res => {
          this._food = res;
        });
    }
  }

  public refreshFood(): Promise<void> {
    return new Promise((resolve, reject) => {
      this._loadFood();
      resolve();
    })
  }

}
