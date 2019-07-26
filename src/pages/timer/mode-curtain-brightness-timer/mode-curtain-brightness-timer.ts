import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Variable } from '../../../providers/model/variable';
import { ToolsProvider } from '../../../providers/tools/tools';
import { CurtainModeParams, CurtainBrightnessParams } from '../../../providers/model/model';
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
  timerOpen: any;
  maxNum: number;
  minNum: number;

  title: string;

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
    let params = new CurtainBrightnessParams();//注意组装顺序
    params.timerOpen = Number(this.timerOpen);
    params.maxNum = this.getTwoValue(this.maxNum);
    params.minNum = this.getTwoValue(this.minNum);
    return params;
  }

  getTwoValue(num: number): Array<any> {
    let temp = parseInt(num.toString());
    let num16 = this.tools.padStart(temp.toString(16), 4, '0');
    let reg = /\w{2}/gi;
    let arr: Array<string> = num16.match(reg);
    let one = parseInt(arr[1], 16);
    let two = parseInt(arr[0], 16);
    let result = Array<any>();
    result.push(one);
    result.push(two);

    return result;
  }

  checkParam(): boolean {
    let reg = /[0-65535]/;
    let msg = '';
    if (!reg.test(this.maxNum.toString())) {
      this.tools.presentToast("开光照度值范围0-65535");
      return false;
    }
    return true;
  }
  getData() {
    let fnData = Variable.GetFnData('55');
    this.timerOpen = Number(fnData.F553);
    this.maxNum = Number(fnData.F554);
    this.minNum = Number(fnData.F555);
  }
}
