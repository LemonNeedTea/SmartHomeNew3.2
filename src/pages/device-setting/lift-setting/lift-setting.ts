import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Variable } from '../../../providers/model/variable';

/**
 * Generated class for the LiftSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lift-setting',
  templateUrl: 'lift-setting.html',
})
export class LiftSettingPage {
  name: string;
  id: string;
  state: boolean;
  f50Data: any;
  auto: boolean;
  paramData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private events: Events,
  ) {
    this.id = this.navParams.get("id");
    this.name = this.navParams.get("name");
    this.paramData = this.navParams.get("data");

    let fn51Data = Variable.GetFnData('state');
    this.getDeviceState(fn51Data);
    this.events.subscribe("FnData:state", this.eventsFn51Handler);
    this.f50Data = Variable.GetFnData('50');
    this.events.subscribe("FnData:50", this.eventsFn50Handler);

    this.auto = Variable.isAuto;
    this.events.subscribe("FnData:isAuto", this.eventsFnAutoHandler);
  }

  ionViewDidLoad() {
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
    this.events.unsubscribe("FnData:50", this.eventsFn50Handler);
    this.events.unsubscribe("FnData:state", this.eventsFn51Handler);
    this.events.unsubscribe("FnData:isAuto", this.eventsFnAutoHandler);
  }
  /**start**/
  private eventsFnAutoHandler = (data: any) => {
    this.auto = data;
  }
  private eventsFn51Handler = (data: any) => {
    this.getDeviceState(data);
  }
  private eventsFn50Handler = (data: any) => {
    this.f50Data = data;
  }
  /**end***/

}
