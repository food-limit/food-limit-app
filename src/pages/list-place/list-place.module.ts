import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListPlacePage } from './list-place';

@NgModule({
  declarations: [
    ListPlacePage,
  ],
  imports: [
    IonicPageModule.forChild(ListPlacePage),
  ],
})
export class ListPlacePageModule {}
