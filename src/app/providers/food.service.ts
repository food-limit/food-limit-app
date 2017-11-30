import { Injectable } from "@angular/core";
import { Food } from "../model/food.model";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { Http } from "@angular/http";

@Injectable()
export class FoodService {
  public foods$: BehaviorSubject<Food[]> = new BehaviorSubject([]);
  private _foodList: Food[];
  public static OUTPAN_API_KEY = '1d8ce0505a943cef4270e978410e9fbc';

  private counter: number = 1;

  constructor(private http: Http) {

  }

  public loadFoods(): void {
    this._foodList = [
      Object.assign(new Food(), {
        id: this.counter++,
        name: "banane",
        dlc: new Date(2017,10,5).toISOString(),
        quantity: 2,
        picture: "http://www.femininbio.com/sites/femininbio.com/files/styles/article/public/styles/paysage/public/images/2013/01/banane.jpg?itok=B7GTuvnK"
      }),
      Object.assign(new Food(), {
        id: this.counter++,
        name: "cornichon",
        dlc: new Date(2018,11,17).toISOString(),
        quantity: 1,
        picture: "https://flowerstore.gr/image/cache/catalog/toersi-konto-ayyouri-sporoi-4yr-270-630x552.jpg"
      }),
      Object.assign(new Food(), {
        id: this.counter++,
        name: "salade",
        dlc: new Date(2018,10,18).toISOString(),
        quantity: 1,
        picture: "https://www.toutpratique.com/img/cms/salade-verte-laitue-scarole-pesticide-comment-laver-la-salade-salade-en-sachet-danger.png"
      })
    ];
    this.foods$.next(this._foodList);
  }

  public deleteFood(food: Food): void {
    this._foodList = this._foodList.filter(f => f.id!=food.id);
    this.foods$.next(this._foodList);
  }

  public createFood(food: Food): void {
    food.id = this.counter++;
    this._foodList.push(food);
    this.foods$.next(this._foodList);
  }

  public getFoodInfos(gtin: string): Observable<any> {
    return this.http.get('https://api.outpan.com/v2/products/' + gtin + '?apikey=' + FoodService.OUTPAN_API_KEY);
  }

  public getFood(foodId: number): Food {
    return this._foodList.find(f => f.id===foodId);
  }

  public updateFood(food: Food): void {
    this._foodList.forEach(f => {
      if(f.id === food.id){
        f = food;
      }
    });
    this.foods$.next(this._foodList);
  }
}
