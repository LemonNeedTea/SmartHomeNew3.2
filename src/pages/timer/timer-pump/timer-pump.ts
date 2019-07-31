import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ToolsProvider } from '../../../providers/tools/tools';
import { WellPumpParams } from '../../../providers/model/model';
import { Variable } from '../../../providers/model/variable';

/**
 * Generated class for the TimerPumpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-timer-pump',
  templateUrl: 'timer-pump.html',
})
export class TimerPumpPage {
  startDate: any;
  timerOpen: any;
  repeatOpen: any;
  runtime: number;
  maxLevel: number;
  minLevel: number;
  repeatNum: string;
  name: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController,
    private tools: ToolsProvider) {
    this.name = this.navParams.get("name");
    this.getTimerPumpInofo();
  }

  ionViewDidLoad() {
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  complate() {
    if (this.checkParam()) {
      let params = this.getParams();
      //设置定时
      Variable.socketObject.setTimer(params);
      this.viewCtrl.dismiss();
    }
  }

  getParams() {
    let params = new WellPumpParams();//注意组装顺序
    params.timerOpen = Number(this.timerOpen);
    params.startHour = this.startDate[0]
    params.startMinute = this.startDate[1];
    params.runtime = this.runtime;
    params.minLevel = this.minLevel;
    params.maxLevel = this.maxLevel;
    params.repeatOpen = Number(this.repeatOpen);
    return params;
  }
  checkParam(): boolean {
    if (!this.maxLevel || this.maxLevel > 200 || this.maxLevel < 1) {
      this.tools.presentToast('最高液位范围1～200');
      return false;
    }
    if (!this.minLevel || this.minLevel > 200 || this.minLevel < 1) {
      this.tools.presentToast('最低液位1～200');
      return false;
    }
    if (this.runtime > 240) {
      this.tools.presentToast("运行时长不能超过4小时");
      return false;
    }
    return true;
  }
  getTimerPumpInofo() {
    // let temp=this.tools.getMinuteByTime('1:30');
    let fnData = Variable.GetFnData('55');
    this.timerOpen = Number(fnData.F551);
    this.startDate = [fnData.F552, fnData.F553];
    this.runtime = fnData.F554;
    this.minLevel = Number(fnData.F555);
    this.repeatOpen = Number(fnData.F558);
    this.maxLevel = Number(fnData.F557);
    this.repeatNum = fnData.F556;
  }

}
