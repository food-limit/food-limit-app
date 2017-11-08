import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FoodService} from "../../app/providers/food.service";
import {Food} from "../../app/model/food.model";
import {SpeechRecognition} from "@ionic-native/speech-recognition";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private readonly toastCtrl: ToastController, private _foodService: FoodService, private _speechRecognition: SpeechRecognition) {
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

  private _getPermissionRecognition() {
    this._speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this._speechRecognition.requestPermission();
        }
      });
  }

  private _addFoodListening(): void {
    this._getPermissionRecognition();
    this._speechRecognition.startListening().subscribe(matches => {
      let correctMatches = matches.filter(match => this.REGEX_CHECK_FOOD.test(match));
      if(correctMatches.length > 0){
        let food: Food = new Food();
        let date: string[] = matches[0].split(" ");
        food.name = date[0];
        food.dlc = new Date(parseInt(date[3]), parseInt(date[2])-1, parseInt(date[1]));
        this._foodService.createFood(food);
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
}
