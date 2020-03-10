import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Variable } from '../../../providers/model/variable';
import { DeviceRequestsProvider } from '../../../providers/tools/requests'

/**
 * Generated class for the CurtainSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-curtain-setting',
  templateUrl: 'curtain-setting.html',
})
export class CurtainSettingPage {
  name: string;
  id: number;
  state: number;
  auto: boolean;
  fnID: string;
  monitorID: number;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private events: Events,
    private device: DeviceRequestsProvider
  ) {
    this.id = this.navParams.get("id");
    this.name = this.navParams.get("name");
    this.monitorID = this.navParams.get('monitorID');
    // this.device.getDeviceGetInfoDataByID(this.id).then(res => {
    // this.fnID = res["F_FnID"];
    // this.fnID = 'state';
    // let fnData = Variable.GetFnData(this.fnID);
    // this.getDeviceState(fnData);
    // this.events.subscribe(`FnData:${this.fnID}`, this.eventsFn51Handler);
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
    }
  }
  setDeviceState(state: any) {
    this.state = state;
    Variable.socketObject.setDeviceStateAndMonitorID(this.id, this.name, state,this.monitorID);
  }
  ionViewDidLeave() {
    // this.events.unsubscribe(`FnData:${this.fnID}`, this.eventsFn51Handler);
    this.events.unsubscribe("FnData:isAuto", this.eventsFnAutoHandler);

  }

}
