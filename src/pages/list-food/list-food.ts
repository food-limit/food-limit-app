import {ChangeDetectorRef, Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, LoadingController} from 'ionic-angular';
import {FoodService} from "../../app/providers/food.service";
import {Food} from "../../app/model/food.model";
import {SpeechRecognition} from "@ionic-native/speech-recognition";
import { BarcodeScanResult, BarcodeScanner } from '@ionic-native/barcode-scanner';
import {DatePipe} from '@angular/common'

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
  providers: [DatePipe]
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
    private readonly toastCtrl: ToastController,
    private _datePipe: DatePipe,
    private loadingCtrl: LoadingController,
    private _changeDetectorRef: ChangeDetectorRef) {
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
        let date: string[] = correctMatches[0].split(" ");
        food.quantity = /[0-9]{1,2}/.test(date[0])?parseInt(date[0]):1;
        food.name = date[1];
        food.dlc = this._datePipe.transform(new Date(parseInt(date[4]), parseInt(date[3]) - 1, parseInt(date[2])), 'yyyy-MM-dd');
        this._foodService.createFood(food).subscribe(res => {
          this._refreshPage();
        });
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

      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Chargement ...'
      });

      loading.present();

      this._foodService.getFoodInfos(scanResult.text).subscribe((res: any) => {
        food.name = res.json().product.attributes.product;
        food.quantity = 1;
        food.dlc = null;
        food.picture = null;
        loading.dismiss();
        this.navCtrl.push("AddFoodPage", {
          'food': food
        });
      });
    });
  }

  private _refreshPage() {
    // this.navCtrl.setRoot(this.navCtrl.getActive().component);
    // window.location.reload();
    this._changeDetectorRef.detectChanges();
  }
}
