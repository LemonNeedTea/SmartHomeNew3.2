import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import{ ConfigProvider } from '../../../providers/config/config';


/**
 * Generated class for the AirSettingModePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-air-setting-mode',
  templateUrl: 'air-setting-mode.html',
})
export class AirSettingModePage {

  dataList: Array<any> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController,
    public config: ConfigProvider) {
    this.dataList = this.navParams.get("Data");
  }

  ionViewDidLoad() {
  }
  dismiss(data: any) {
    if (data != null) {
      this.viewCtrl.dismiss(data);
    } else {
      this.viewCtrl.dismiss();
    }
  }

}
