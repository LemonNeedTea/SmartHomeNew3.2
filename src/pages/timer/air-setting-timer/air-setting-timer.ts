import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ToolsProvider } from '../../../providers/tools/tools'
import { Variable } from '../../../providers/model/variable';

/**
 * Generated class for the AirSettingTimerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-air-setting-timer',
  templateUrl: 'air-setting-timer.html',
})
export class AirSettingTimerPage {
  id: number;
  title: string;
  fnID: string;
  airTimerfFnID: string;
  monitorID: string;
  loop: Array<number>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController,
    private tools: ToolsProvider) {
    this.id = this.navParams.get("id");
    this.title = this.navParams.get("name");
    this.fnID = this.navParams.get("fnID");
    this.airTimerfFnID = this.tools.getMonitorFnID(this.fnID, this.monitorID);
    let fnData = Variable.GetFnData(this.airTimerfFnID);
    this.getTimerFnData(fnData);
  }
  getTimerFnData(data: any) {
    let startNum = 1;
    switch (this.id) {
      case 1: {
        startNum = 1; break;
      }
      case 2: {
        startNum = 13; break;
      }
      case 3: {
        startNum = 25; break;
      }
      case 4: {
        startNum = 37; break;
      }
    }
    let fnCode = `F${this.fnID}${startNum}`;
    let loopData = 43;//data[fnCode + 1];
    this.loop = this.getBinaryArr(loopData);

  }
  getBinaryArr(num: number): any {
    let arr: Array<number> = [];
    let binStr = num.toString(2);
    let fullBinStr = this.tools.padStart(binStr, 7, '0');
    let splitArr = fullBinStr.match(/\w/gi);
    let resplitArr = splitArr.reverse();
    arr.push(parseInt(resplitArr[6]));
    arr.push(parseInt(resplitArr[0]));
    arr.push(parseInt(resplitArr[1]));
    arr.push(parseInt(resplitArr[2]));
    arr.push(parseInt(resplitArr[3]));
    arr.push(parseInt(resplitArr[4]));
    arr.push(parseInt(resplitArr[5]));
    return arr;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AirSettingTimerPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  complate() {
    // let params = this.getParams();
    // if (this.checkParam()) {
    //   Variable.socketObject.setTimer(params);
    this.dismiss();
  }


}
