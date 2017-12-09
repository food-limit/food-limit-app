import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {Food} from "../../app/model/food.model";
import {FoodService} from "../../app/providers/food.service";

/**
 * Generated class for the AddFoodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-food',
  templateUrl: 'add-food.html',
})
export class AddFoodPage {

  public minDate = new Date().toISOString();

  private _food: Food;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public toastCtrl: ToastController, private _foodService: FoodService) {
    this._food = new Food();
  }

  ionViewDidLoad() {
    if(this.navParams.get('food')) {
      this._food = this.navParams.get('food');
    }
  }

  public _showToastWithCloseButton(message: string): void {
    const toast = this.toastCtrl.create({
      message: message,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

  public _addFood(food: Food): void {
    this._foodService.createFood(food)
      .subscribe(res => {
        this.navCtrl.pop();
      });
  }
}
