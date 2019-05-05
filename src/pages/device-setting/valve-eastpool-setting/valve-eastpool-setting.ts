import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
// import { PumpNorthcourtTimerPage } from '../../timer/pump-northcourt-timer/pump-northcourt-timer';
import { Variable } from '../../../providers/model/variable';

/**
 * Generated class for the ValveEastpoolSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-valve-eastpool-setting',
  templateUrl: 'valve-eastpool-setting.html',
})
export class ValveEastpoolSettingPage {
  name: string;
  id: string;
  state: boolean;
  auto: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController,
    private events: Events,
  ) {
    this.id = this.navParams.get("id");
    this.name = this.navParams.get("name");
    let fn51Data = Variable.GetFnData('51');
    this.getDeviceState(fn51Data);
    this.events.subscribe("FnData:51", this.eventsFn51Handler);
    this.auto = Variable.isAuto;
    this.events.subscribe("FnData:isAuto", this.eventsFnAutoHandler);
  }

  ionViewDidLoad() {
  }
  presentShowModal() {
    let profileModal = this.modalCtrl.create('ValveEastpoolTimerPage');
    profileModal.onDidDismiss(data => {
    });
    profileModal.present();
  }
  getDeviceState(data: any) {
    if (data) {
      this.state = data[this.id];
    }
  }
  setDeviceState(state: string) {
    Variable.socketObject.setDeviceState(this.id, this.name, state);
  }
  ionViewDidLeave() {
    this.events.unsubscribe("FnData:51", this.eventsFn51Handler);
    this.events.unsubscribe("FnData:isAuto", this.eventsFnAutoHandler);

  }
  /**start**/
  private eventsFnAutoHandler = (data: any) => {
    this.auto = data;
  }
  private eventsFn51Handler = (data: any) => {
    this.getDeviceState(data);
  }
  /**end***/
}
