import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FoodService} from "../../app/providers/food.service";
import {Food} from "../../app/model/food.model";
import {SpeechRecognition} from "@ionic-native/speech-recognition";
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
  private _modalAddFoodIsOpen: boolean;

  public REGEX_CHECK_FOOD: RegExp = /[a-zA-Z]{3,}\s[0-9]{1,2}\s([0-9]{1,2}|janvier|fevrier|mars|avril|mai|juin|juillet|aout|septembre|octobre|novembre|decembre)\s[0-9]{4}/;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _foodService: FoodService,
    private _barcode: BarcodeScanner,
    private _speechRecognition: SpeechRecognition,
    private readonly toastCtrl: ToastController) {
    this._foodService.loadFoods();
  }

  public openModalAddFood(): void {
    this._modalAddFoodIsOpen = true;
  }

  public closeModalAddFood(): void {
    this._modalAddFoodIsOpen = false;
  }

  public viewFood(food: Food): void {
    this.navCtrl.push("DetailFoodPage", {
      'id': food.id
    });
  }

  public editFood(food: Food): void {
    this.navCtrl.push("EditFoodPage", {
      'id': food.id,
      callback: () => new Promise((resolve, reject) => {
        resolve();
      })
    });
  }

  public deleteFood(food: Food): void {
    this._foodService.deleteFood(food.id);
  }

  private _getPermissionRecognition() {
    this._speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this._speechRecognition.requestPermission();
        }
      });
  }

  public addFoodListening(): void {
    this._getPermissionRecognition();
    this._speechRecognition.startListening().subscribe(matches => {
      let correctMatches = matches.filter(match => this.REGEX_CHECK_FOOD.test(match));
      if (correctMatches.length > 0) {
        let food: Food = new Food();
        let date: string[] = matches[0].split(" ");
        food.name = date[0];
        food.dlc = new Date(parseInt(date[3]), parseInt(date[2]) - 1, parseInt(date[1])).toISOString();
        this._foodService.createFood(food).subscribe();
      } else {
        let message: string = "Aliment non reconnu !";
        const toast = this.toastCtrl.create({
          message,
          duration: 5000,
          position: 'bottom'
        });
        toast.present();
      }
    });
  }

  public addFoodKeyboard(): void {
    this.navCtrl.push("AddFoodPage");
  }

  public addFoodScanBarcode(): void {
    const food: Food = new Food();
    this.closeModalAddFood();
    this._barcode.scan().then((scanResult: BarcodeScanResult) => {
      this._foodService.getFoodInfos(scanResult.text).subscribe((res: any) => {
        food.name = res.json().product.attributes.product;
        food.quantity = 1;
        food.dlc = null;
        food.picture = null;
        this.navCtrl.push("AddFoodPage", {
          'food': food
        });
      });
    });
  }
}
