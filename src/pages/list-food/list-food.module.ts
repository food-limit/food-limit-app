import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListFoodPage } from './list-food';

@NgModule({
  declarations: [
    ListFoodPage,
  ],
  imports: [
    IonicPageModule.forChild(ListFoodPage),
  ],
})
export class ListFoodPageModule {}
