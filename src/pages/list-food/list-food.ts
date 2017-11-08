import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FoodService} from "../../app/providers/food.service";
import {Food} from "../../app/model/food.model";
import { BarcodeScanResult, BarcodeScanner } from '@ionic-native/barcode-scanner';

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
  private counter: number = 3;
  private _modalAddFoodIsOpen: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _foodService: FoodService,
    private _barcode: BarcodeScanner) {
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

  private _scanBarcode(): void {
    const food: Food = new Food();
    this._closeModalAddFood();
    this._barcode.scan().then((scanResult: BarcodeScanResult) => {
      this._foodService.getFoodInfos(scanResult.text).subscribe((res: any) => {
        food.id = ++this.counter;
        food.name = res.json().name;
        food.quantity = 1;
        food.dlc = new Date();
        food.picture = null;
        this._foodService.createFood(food);
      });
    });
  }
}
