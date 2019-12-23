import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Variable } from '../../../providers/model/variable';
import { ToolsProvider } from '../../../providers/tools/tools';
import { CurtainTimerParams } from '../../../providers/model/model';
/**
 * Generated class for the DeviceCurtainTimerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-device-curtain-timer',
  templateUrl: 'device-curtain-timer.html',
})
export class DeviceCurtainTimerPage {

  loop: any = {};
  startDate: any = {};
  timerOpen: any = {};

  title: string;
  curtainInfo: any = {};
  monitorID: number;
  dataList: any = [];
  fnData: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController,
    private tools: ToolsProvider) {
    this.title = this.navParams.get("name");
    this.curtainInfo = this.navParams.get("curtainInfo");
    this.monitorID = this.navParams.get("monitorID");

    for (let i = 1; i <= 6; i++) {
      this.dataList.push({
        index: i
      });
    }

    this.getData();
  }

  ionViewDidLoad() {
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  complate() {
    this.dismiss();
    // let params = this.getParams();
    // if (this.checkParam()) {
    //   Variable.socketObject.setTimer(params);
    //   this.dismiss();
    // }

  }
  setTimer(index: number) {
    let params = this.getParams(index);
    if (this.checkParam()) {
      Variable.socketObject.sendMessage(this.monitorID, this.curtainInfo.timerSetFnID, params);
      this.dismiss();
    }
    // console.log(params);
    /*
    路号
    组号
    设定有效星期
    定时时间：小时
    定时时间：分
    打开 / 关闭窗帘
    */



  }

  getParams(index) {
    // let params = new CurtainTimerParams();//注意组装顺序
    let code = this.curtainInfo.timerRoadID;
    let group = index;
    let loop = this.tools.getNumberByArr(this.loop[index]);
    let startDate = this.startDate[index];
    let timerOpen = this.timerOpen[index] ? 1 : 2;

    return `${code},${group},${loop},${startDate},${timerOpen}`;
    // return params;
  }
  checkParam(): boolean {
    return true;
  }
  getData() {
    this.fnData = Variable.GetFnDataByMonitorID(this.curtainInfo.timerGetFnID, this.monitorID);
    // console.log(fnData);
    for (let i = 1; i <= 6; i++) {
      this.loop[i] = this.tools.getBinaryArr(this.getFnStr(1 + (i - 1) * 4));
      this.startDate[i] = [this.getFnStr(2 + (i - 1) * 4), this.getFnStr(3 + (i - 1) * 4)];
      this.timerOpen[i] = this.getFnStr(4 + (i - 1) * 4) == 1 ? true : false;
    }




  }
  getFnStr(num) {
    let str = `F${this.curtainInfo.timerGetFnID}${num + (this.curtainInfo.timerRoadID - 1) * 40}`;
    return this.fnData[str];
  }

}
