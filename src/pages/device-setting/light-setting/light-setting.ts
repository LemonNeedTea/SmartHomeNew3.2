import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Variable } from '../../../providers/model/variable';
import { DeviceRequestsProvider } from '../../../providers/tools/requests'
/**
 * Generated class for the LightSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-light-setting',
  templateUrl: 'light-setting.html',
})
export class LightSettingPage {
  name: string;
  id: number;
  state: number;
  auto: boolean;
  fnID: string;
  brightness: number;
  brightness1: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private events: Events,
    private device: DeviceRequestsProvider
  ) {
    this.id = this.navParams.get("id");
    this.name = this.navParams.get("name");

    // this.device.getDeviceGetInfoDataByID(this.id).then(res => {
    // this.fnID = res["F_FnID"];
    this.fnID = 'state';
    let fnData = Variable.GetFnData(this.fnID);
    this.getDeviceState(fnData);
    this.events.subscribe(`FnData:${this.fnID}`, this.eventsFn51Handler);
    // });




    this.auto = Variable.isAuto;
    this.events.subscribe("FnData:isAuto", this.eventsFnAutoHandler);
  }
  /**start**/
  private eventsFnAutoHandler = (data: any) => {
    this.auto = data;
  }
  private eventsFn51Handler = (data: any) => {
    this.getDeviceState(data);
  }
  /**end***/

  ionViewDidLoad() {
  }
  getDeviceState(data: any) {
    if (data) {
      this.state = data[this.id][0];
      this.brightness = Number(data['-11'])[0];
      this.brightness1 = Number(data['-12'])[0];

    }
  }
  setDeviceState(state: any) {
    this.state = state;
    Variable.socketObject.setDeviceState(this.id, this.name, state);
  }
  ionViewDidLeave() {
    this.events.unsubscribe(`FnData:${this.fnID}`, this.eventsFn51Handler);
    this.events.unsubscribe("FnData:isAuto", this.eventsFnAutoHandler);

  }
  brightnessChange(data: any) {
    let id = 0;
    switch (data) {
      case 1: { id = 28; break; }
      case 2: { id = 29; break; }
      case 3: { id = 30; break; }
    }
    this.setLight(id);

  }
  colorChange(data: any) {
    let id = 0;
    switch (data) {
      case 1: { id = 25; break; }
      case 2: { id = 26; break; }
      case 3: { id = 27; break; }
    }
    this.setLight(id);
  }
  setLight(id: number) {
    let data = `${id},1`;//42 主机标号 模式 参数
    Variable.socketObject.setAir(data, 1, 40);
  }
}
