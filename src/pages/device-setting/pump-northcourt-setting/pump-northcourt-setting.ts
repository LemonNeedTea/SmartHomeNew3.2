import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
// import { PumpNorthcourtTimerPage } from '../../timer/pump-northcourt-timer/pump-northcourt-timer';
import { Variable } from '../../../providers/model/variable';

/**
 * Generated class for the PumpNorthcourtSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pump-northcourt-setting',
  templateUrl: 'pump-northcourt-setting.html',
})
export class PumpNorthcourtSettingPage {
  name: string;
  id: string;
  state: boolean;
  auto: boolean;
  timerState: boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController,
    private events: Events,
  ) {
    this.id = this.navParams.get("id");
    this.name = this.navParams.get("name");
    let fn51Data = Variable.GetFnData('state');
    this.getDeviceState(fn51Data);
    this.events.subscribe("FnData:state", this.eventsFn51Handler);
    this.auto = Variable.isAuto;
    this.events.subscribe("FnData:isAuto", this.eventsFnAutoHandler);
    let fn55Data = Variable.GetFnData('55');
    this.getTimerState(fn55Data);
    this.events.subscribe("FnData:55", this.eventsFn55Handler);
  }
  private getTimerState(data: any) {
    if (data) {
      this.timerState = !Boolean(Number(data["F5547"]));
    }
  }

  ionViewDidLoad() {
  }
  presentShowModal() {
    let profileModal = this.modalCtrl.create('PumpNorthcourtTimerPage');
    profileModal.onDidDismiss(data => {
    });
    profileModal.present();
  }
  getDeviceState(data: any) {
    if (data) {
      this.state = data[this.id][0];
    }
  }
  setDeviceState(state: string) {
    Variable.socketObject.setDeviceState(this.id, this.name, state);
  }
  ionViewDidLeave() {
    this.events.unsubscribe("FnData:51", this.eventsFn51Handler);
    this.events.unsubscribe("FnData:isAuto", this.eventsFnAutoHandler);
    this.events.unsubscribe("FnData:55", this.eventsFn55Handler);

  }
  /**start**/
  private eventsFnAutoHandler = (data: any) => {
    this.auto = data;
  }
  private eventsFn51Handler = (data: any) => {
    this.getDeviceState(data);
  }
  private eventsFn55Handler = (data: any) => {
    this.getTimerState(data);
  }
  /**end***/
}
