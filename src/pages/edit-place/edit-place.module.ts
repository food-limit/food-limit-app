import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditPlacePage } from './edit-place';

@NgModule({
  declarations: [
    EditPlacePage,
  ],
  imports: [
    IonicPageModule.forChild(EditPlacePage),
  ],
})
export class EditPlacePageModule {}
