import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ToolsProvider } from '../../../providers/tools/tools'
import { Variable } from '../../../providers/model/variable';
import { airSettingTimerParams } from '../../../providers/model/model';

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
  tempMin: number = 15;
  tempMax: number = 30;
  tempColumns: any = [];
  modeColumns: any = [];
  speedColumns: any = [];
  mode: Array<any> = [];
  speed: Array<any> = [];
  modeModal: any;
  speedModal: any;
  tempModal: any;
  startDate: any;
  stopDate: any;
  startDate1: any;
  stopDate1: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController,
    private tools: ToolsProvider) {
    this.id = this.navParams.get("id");
    this.title = this.navParams.get("name");
    this.fnID = this.navParams.get("fnID");
    this.mode = this.navParams.get("mode");
    this.speed = this.navParams.get("speed");
    this.monitorID = this.navParams.get("monitorID");
    this.getTempColumns();
    this.getModeColumns();
    this.getSpeedColumns();

    this.airTimerfFnID = this.tools.getMonitorFnID(this.fnID, this.monitorID);
    let fnData = Variable.GetFnData(this.airTimerfFnID);
    this.getTimerFnData(fnData);

  }
  getTimerFnData(data: any) {
    let startNum = 1;
    switch (this.id) {
      case 1: {
        startNum = 0; break;
      }
      case 2: {
        startNum = 12; break;
      }
      case 3: {
        startNum = 24; break;
      }
      case 4: {
        startNum = 36; break;
      }
    }
    let fnCode = `F${this.fnID}`;
    let loopData = data[fnCode + (startNum + 1)];
    this.loop = this.getBinaryArr(loopData);
    this.startDate = [data[fnCode + (startNum + 2)], data[fnCode + (startNum + 3)]];
    this.stopDate = [data[fnCode + (startNum + 4)], data[fnCode + (startNum + 5)]];
    this.startDate1 = [data[fnCode + (startNum + 6)], data[fnCode + (startNum + 7)]];
    this.stopDate1 = [data[fnCode + (startNum + 8)], data[fnCode + (startNum + 9)]];
    this.modeModal = data[fnCode + (startNum + 10)];
    // this.speedModal = data[fnCode + (startNum + 11)];
    this.tempModal = data[fnCode + (startNum + 12)];

  }
  getBinaryArr(num: any): any {
    let arr: Array<number> = [];
    let binStr = parseInt(num).toString(2);
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
    // this.dismiss();
    this.getSettingParams();
  }

  getTempColumns() {
    let t = [];
    for (let i = this.tempMin; i <= this.tempMax; i++) {
      t.push({ text: `${i}℃`, value: i });
    }
    this.tempColumns = [
      {
        options: t
      }];
  }

  getModeColumns() {
    let t = [];
    this.mode.forEach(element => {
      t.push({ text: `${element["F_ParamsName"]}`, value: element["F_paramsValue"] });
    });
    this.modeColumns = [
      {
        options: t
      }
    ];
  }
  getSpeedColumns() {
    let t = [];
    t.push({ text: '自动', value: 0 });
    this.speed.forEach(element => {
      t.push({ text: `${element["F_ParamsName"]}`, value: element["F_paramsValue"] });
    });
    this.speedColumns = [
      {
        options: t
      }
    ];
  }

  getSettingParams() {
    let params = new airSettingTimerParams();
    params.code = this.id - 1;
    params.loop = this.tools.getNumberByArr(this.loop);
    params.startDate = this.startDate;
    params.stopDate = this.stopDate;
    params.startDate1 = this.startDate1;
    params.stopDate1 = this.stopDate1;
    params.mode = this.modeModal;
    params.speed = '0';
    params.temp = this.tempModal;
    let controlData = this.tools.getSendControl(params, 13);
    Variable.socketObject.sendMessage(this.monitorID, 9, controlData);
    setTimeout(() => {
      Variable.socketObject.dismissLoading();
      this.viewCtrl.dismiss();
    }, 5000);
  }

}
