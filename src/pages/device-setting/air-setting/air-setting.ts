import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AirSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-air-setting',
  templateUrl: 'air-setting.html',
})
export class AirSettingPage {
  name: string;
  id: string;
  paramData:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.id = this.navParams.get("id");
    this.name = this.navParams.get("name");
    this.paramData = this.navParams.get("data");
    console.log(this.paramData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AirSettingPage');
  }

}
