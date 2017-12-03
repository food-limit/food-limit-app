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

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public toastCtrl: ToastController, private _foodService: FoodService) {

  }

  ionViewDidLoad() {
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
    this._foodService.createFood(food);
    this.viewCtrl.dismiss();
  }
}
