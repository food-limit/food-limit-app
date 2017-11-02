import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FoodService} from "../../app/providers/food.service";
import {Food} from "../../app/model/food.model";

/**
 * Generated class for the ListFoodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-food',
  templateUrl: 'list-food.html',
})
export class ListFoodPage {
  private _modalAddFoodIsOpen: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _foodService: FoodService) {
    this._foodService.loadFoods();
  }

  private _openModalAddFood(): void {
    this._modalAddFoodIsOpen = true;
  }

  private _closeModalAddFood(): void {
    this._modalAddFoodIsOpen = false;
  }

  private _viewFood(food: Food): void {
    console.log("food",food);
    this.navCtrl.push("DetailFoodPage");
  }

  private _editFood(food: Food): void {

  }

  private _deleteFood(food: Food): void {
    this._foodService.deleteFood(food);
  }

}
