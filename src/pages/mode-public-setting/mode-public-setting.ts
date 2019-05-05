import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
// import { ModeAirseasonsonTimerPage } from '../timer/mode-airseasonson-timer/mode-airseasonson-timer';
// import { ModeCurtainTimerPage } from '../timer/mode-curtain-timer/mode-curtain-timer';
// import { ModeLightJwTimerPage } from '../timer/mode-light-jw-timer/mode-light-jw-timer';
// import { ModeLightTimerPage } from '../timer/mode-light-timer/mode-light-timer';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
  }
  goCurtain() {
    this.presentShowModal('ModeCurtainTimerPage');
  }
  goLight() {
    this.presentShowModal('ModeLightTimerPage');

  }
  goAirSeason() {
    this.presentShowModal('ModeAirseasonsonTimerPage');
  }
  goLightJW() {
    this.presentShowModal('ModeLightJwTimerPage');

  }
  presentShowModal(page: any) {
    let profileModal = this.modalCtrl.create(page);
    profileModal.onDidDismiss(data => {
    });
    profileModal.present();
  }
}
