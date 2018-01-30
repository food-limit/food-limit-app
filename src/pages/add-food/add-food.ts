import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController, LoadingController} from 'ionic-angular';
import {Food} from "../../app/model/food.model";
import {FoodService} from "../../app/providers/food.service";

import plural from 'pluralize-fr';

/**
 * Generated class for the AddFoodPage pa
 * ge.
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

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private _foodService: FoodService,
    private loadingCtrl: LoadingController,) {
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
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Ajout en cours ...'
    });

    if (food.quantity > 1) {
      food.name = plural(food.name).toLowerCase();
    } else {
      food.name = food.name.toLowerCase();
    }

    loading.present();

    this._foodService.createFood(food)
      .subscribe(res => {
        loading.dismiss();
        this.navCtrl.pop();
      });
  }
}
