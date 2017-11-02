import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailFoodPage } from './detail-food';

@NgModule({
  declarations: [
    DetailFoodPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailFoodPage),
  ],
})
export class DetailFoodPageModule {}
