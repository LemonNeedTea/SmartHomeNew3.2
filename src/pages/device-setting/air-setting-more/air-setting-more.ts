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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.name = this.navParams.get("name");
    this.id = this.navParams.get("id");
    this.hotPumpModeColumns = [
      {
        options: [
          { text: '制冷', value: 0 },
          { text: '制热', value: 1 }
        ]
      }];
    this.hotColumns = [
      {
        options: [
          { text: '风盘', value: 0 },
          { text: '地暖', value: 1 },
          { text: '风盘+地暖', value: 2 }
        ]
      }];
    this.coolColumns = [
      {
        options: [
          { text: '风盘', value: 0 },
          { text: '地冷', value: 1 },
          { text: '风盘+地冷', value: 2 }
        ]
      }];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AirSettingMorePage');
  }

}
