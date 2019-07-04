import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
// import { ModeAirseasonsonTimerPage } from '../timer/mode-airseasonson-timer/mode-airseasonson-timer';
// import { ModeCurtainTimerPage } from '../timer/mode-curtain-timer/mode-curtain-timer';
// import { ModeLightJwTimerPage } from '../timer/mode-light-jw-timer/mode-light-jw-timer';
// import { ModeLightTimerPage } from '../timer/mode-light-timer/mode-light-timer';
import { DeviceRequestsProvider } from '../../providers/tools/requests'
/**
 * Generated class for the ModePublicSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mode-public-setting',
  templateUrl: 'mode-public-setting.html',
})
export class ModePublicSettingPage {
  dataList: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController,
    private device: DeviceRequestsProvider) {
    this.device.getModeSettingDataList().then(res => {
      this.dataList = res;
    });
  }

  ionViewDidLoad() {
  }
  presentShowModal(page: any) {
    let profileModal = this.modalCtrl.create(page);
    profileModal.onDidDismiss(data => {
    });
    profileModal.present();
  }
}
