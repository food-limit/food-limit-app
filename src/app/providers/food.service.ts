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

  private counter: number = 0;

  constructor(private http: Http) {

  }

  public loadFoods(): void {
    this._foodList = [
      Object.assign(new Food(), {
        id: this.counter++,
        name: "banane",
        dlc: new Date(5,10,2017),
        quantity: 2,
        picture: ""
      }),
      Object.assign(new Food(), {
        id: this.counter++,
        name: "cornichon",
        dlc: new Date(5,10,2018),
        quantity: 1,
        picture: ""
      }),
      Object.assign(new Food(), {
        id: this.counter++,
        name: "salade",
        dlc: new Date(5,10,2018),
        quantity: 1,
        picture: ""
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

}
