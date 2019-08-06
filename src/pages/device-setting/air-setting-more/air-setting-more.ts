import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AirSettingMorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-air-setting-more',
  templateUrl: 'air-setting-more.html',
})
export class AirSettingMorePage {
  name: string;
  id: string;
  hotPumpModeColumns: any;
  hotColumns: any;
  coolColumns: any;
  hotPumpModel: number;
  coolModel: number;
  hotModel: number;
  tempMin: number = 16;
  tempMax: number = 30;
  tempColumns: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.name = this.navParams.get("name");
    this.id = this.navParams.get("id");
    this.getTempColumns();
  }

  ionViewDidLoad() {
  }
  getTempColumns() {
    let t = [];
    for (let i = this.tempMin; i <= this.tempMax; i++) {
      t.push({ text: `${i}`, value: i });
    }
    this.tempColumns = [
      {
        options: t
      }];
  }


}
