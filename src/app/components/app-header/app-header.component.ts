import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'app-header',
  templateUrl: 'app-header.component.html'
})
export class AppHeaderComponent {

  @Input()
  public showNavigation: boolean = true;

  constructor(public navCtrl: NavController) {

  }

}
