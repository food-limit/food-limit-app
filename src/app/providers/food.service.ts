import { Injectable } from "@angular/core";
import { Food } from "../model/food.model";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { Http, RequestOptions, Headers } from "@angular/http";
import { AuthProvider } from '../../providers/auth/auth';
import { DEFAULT_PICTURE_URL, GETTY_API_KEY, OUTPAN_API_KEY, OUTPAN_API_URL, SERVER_URL } from '../../config';

@Injectable()
export class FoodService {
  public foods$: BehaviorSubject<Food[]> = new BehaviorSubject([]);
  private _foodList: Food[];

  private counter: number = 1;

  constructor(private http: Http, private authProvider: AuthProvider) {

  }

  public loadFoods(): void {
    this.authProvider.authUser.subscribe((jwt) => {
      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      headers.append('Authorization', 'Bearer ' + jwt);
      const options = new RequestOptions({ headers: headers });

      this.http.get(`${SERVER_URL}/foods`, options).subscribe((foodList) => {
        this._foodList = foodList.json();
        this.foods$.next(this._foodList);
      });
    });
  }

  public getFood(foodId: number): Food {
    return this._foodList.find(f => f.id === foodId);
  }

  public deleteFood(food: Food): void {
    this._foodList = this._foodList.filter(f => f.id != food.id);
    this.foods$.next(this._foodList);
  }

  public createFood(food: Food): void {
    this.getFoodPictures(food.name).subscribe(
      res => {
        if (res.json().images.length > 0) {
          food.picture = res.json().images[0].display_sizes[0].uri;
          food.id = this.counter++;
          this._foodList.push(food);
          this.foods$.next(this._foodList);
        } else {
          food.picture = DEFAULT_PICTURE_URL;
        }
      });
  }

  public updateFood(food: Food): void {
    this._foodList.forEach((newFood, index) => {
      if (newFood.id === food.id) {
        this._foodList[index] = newFood;
      }
    });
    this.foods$.next(this._foodList);
  }

  public getFoodInfos(gtin: string): Observable<any> {
    return this.http.get(`${OUTPAN_API_URL}/${gtin}?apikey=${OUTPAN_API_KEY}`);
  }

  public getFoodPictures(value: string): Observable<any> {
    let headers: Headers = new Headers({ 'Content-Type': 'application/json', 'Api-Key': GETTY_API_KEY });
    let options = new RequestOptions({ headers: headers });
    return this.http.get('https://api.gettyimages.com/v3/search/images?phrase=' + value, options);
  }
}
