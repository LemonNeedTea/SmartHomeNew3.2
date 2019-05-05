import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
// import { PumpEastnorthpoolTimerPage } from '../../timer/pump-eastnorthpool-timer/pump-eastnorthpool-timer';
import { Variable } from '../../../providers/model/variable';

/**
 * Generated class for the PumpEastnorthpoolSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pump-eastnorthpool-setting',
  templateUrl: 'pump-eastnorthpool-setting.html',
})
export class PumpEastnorthpoolSettingPage {
  name: string;
  id: string;
  state: boolean;
  state1: boolean;
  idE: string = '44';
  idN: string = '53';
  nameE: string = '南水池循环泵';
  nameN: string = '北水池循环泵';
  auto: boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController,
    public events: Events) {
    this.id = this.navParams.get("id");
    this.name = this.navParams.get("name");
    let fn51Data = Variable.GetFnData('51');
    this.getDeviceState(fn51Data);
    this.events.subscribe("FnData:51", this.eventsFn51Handler);
    this.auto = Variable.isAuto;
    this.events.subscribe("FnData:isAuto", this.eventsFnAutoHandler);
  }
  getDeviceState(data: any) {
    if (data) {
      this.state = data[this.idE];
      this.state1 = data[this.idN];
    }
  }
  setDeviceState(id: string, name: string, state: string) {
    Variable.socketObject.setDeviceState(id, name, state);
  }


  ionViewDidLoad() {
  }
  ionViewDidLeave() {
    this.events.unsubscribe("FnData:51", this.eventsFn51Handler);
    this.events.unsubscribe("FnData:isAuto", this.eventsFnAutoHandler);

  }
  presentShowModal() {
    let profileModal = this.modalCtrl.create('PumpEastnorthpoolTimerPage');
    profileModal.onDidDismiss(data => {
    });
    profileModal.present();
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
