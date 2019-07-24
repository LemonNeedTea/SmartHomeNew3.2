import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Variable } from '../../../providers/model/variable';
import { ToolsProvider } from '../../../providers/tools/tools';
import { CurtainModeParams } from '../../../providers/model/model';
/**
 * Generated class for the ModeCurtainBrightnessTimerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mode-curtain-brightness-timer',
  templateUrl: 'mode-curtain-brightness-timer.html',
})
export class ModeCurtainBrightnessTimerPage {
  loop: any;
  timerOpen: any;
  startDate: any;
  stopDate: any;
  startDate1: any;
  stopDate1: any;
  title:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController,
    private tools: ToolsProvider) {
      let data = this.navParams.get("Data");
      this.title = data["F_Name"];
    this.getData();
  }

  ionViewDidLoad() {
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  complate() {
    let params = this.getParams();
    if (this.checkParam()) {
      Variable.socketObject.setTimer(params);
      this.dismiss();
    }

  }
  getParams() {
    let params = new CurtainModeParams();//注意组装顺序
    params.timerOpen = Number(this.timerOpen);
    params.loop = this.getfullMonth(this.loop);
    params.starDate = this.startDate;
    params.stopDate = this.stopDate;
    params.starDate1 = this.startDate1;
    params.stopDate1 = this.stopDate1;
    return params;
  }
  getfullMonth(data: Array<number>): Array<number> {
    let count = data.length;
    for (let i = 0; i < 6 - count; i++) {
      data.push(0);
    }
    return data;
  }
  checkParam(): boolean {
    if (this.loop.length > 6) {
      this.tools.presentToast("最多选择6个月");
      return false;
    }
    return true;
  }
  getData() {
    let fnData = Variable.GetFnData('55');
    this.loop = this.tools.getArrayByFnData(fnData, '55', 33, 6);
    this.timerOpen = Number(fnData.F5532);
    this.startDate = [fnData.F5539, fnData.F5540];
    this.stopDate = [fnData.F5541, fnData.F5542];
    this.startDate1 = [fnData.F5543, fnData.F5544];
    this.stopDate1 = [fnData.F5545, fnData.F5546];
  }
}
