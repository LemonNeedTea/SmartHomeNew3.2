import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { DeviceRequestsProvider } from '../../providers/tools/requests'
import { Variable } from '../../providers/model/variable';

/**
 * Generated class for the EnvironmentalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-environmental',
  templateUrl: 'environmental.html',
})
export class EnvironmentalPage {
  parentParam: any;
  dataList: any = [];
  fnID: number;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private device: DeviceRequestsProvider,
    private events: Events, ) {
    this.parentParam = this.navParams.get("Data");
    this.device.getEnergyQuery(this.parentParam.F_ID).then(res => {
      this.dataList = res;
      this.fnID = res[0].F_GPRSFnID;
      let fnData = Variable.GetFnData(this.fnID.toString());
      this.getState(fnData);
      this.events.subscribe(`FnData:${this.fnID}`, this.eventsFnHandler);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnvironmentalPage');
  }
  goSetting(data) {
    this.navCtrl.push('WellpumpqueryPage', { Data: data, type: 'env' });
  }
  private eventsFnHandler = (data: any) => {
    this.getState(data);
  }
  ionViewWillUnload() {
    console.log("leave");
    this.events.unsubscribe(`FnData:${this.fnID}`, this.eventsFnHandler);

  }

  getState(data: any) {
    this.dataList.forEach(element => {
      element.Value = data[element.F_FnCode];
    });
  }

}
