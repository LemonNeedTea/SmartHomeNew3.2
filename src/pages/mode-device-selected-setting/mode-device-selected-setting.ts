import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModeDeviceSelectedSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mode-device-selected-setting',
  templateUrl: 'mode-device-selected-setting.html',
})
export class ModeDeviceSelectedSettingPage {
  dataList: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController) {
    this.dataList = this.navParams.get("dataList");

  }

  ionViewWillEnter() {

  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  complate() {
    this.viewCtrl.dismiss(this.dataList);
  }

}
