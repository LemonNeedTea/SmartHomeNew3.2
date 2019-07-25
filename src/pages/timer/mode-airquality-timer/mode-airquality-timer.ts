import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Variable } from '../../../providers/model/variable';
import { ToolsProvider } from '../../../providers/tools/tools';
import { CurtainModeParams, AirQualityParams } from '../../../providers/model/model';
/**
 * Generated class for the ModeAirqualityTimerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mode-airquality-timer',
  templateUrl: 'mode-airquality-timer.html',
})
export class ModeAirqualityTimerPage {

  timerOpen: any;
  timerOpen1: any;
  maxNum: number;
  minNum: number;
  maxNum2: number;
  minNum2: number;

  maxNum3: number;
  minNum3: number;

  maxNum4: number;
  minNum4: number;


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
    let params = new AirQualityParams();//注意组装顺序
    params.timerOpen = Number(this.timerOpen);
    params.timerOpen1 = Number(this.timerOpen1);
    params.maxNum = this.maxNum;
    params.minNum = this.minNum;
    params.maxNum2 = this.maxNum2;
    params.minNum2 = this.minNum2;
    params.maxNum3 = this.maxNum3;
    params.minNum3 = this.minNum3;
    params.maxNum4 = this.maxNum4;
    params.minNum4 = this.minNum4;
    return params;
  }

  checkParam(): boolean {
    // let reg=/[1-200]/;
    // if(reg.test(this.maxNum+"")){
    //   this.tools.presentToast(xia xian)
    // }
    return true;
  }
  getData() {
    let fnData = Variable.GetFnData('55');
    this.timerOpen = Number(fnData.F556);
    this.timerOpen1 = Number(fnData.F557);
    this.maxNum = Number(fnData.F558);
    this.minNum = Number(fnData.F559);

    this.maxNum2 = Number(fnData.F5510);
    this.minNum2 = Number(fnData.F5511);

    this.maxNum3 = Number(fnData.F5512);
    this.minNum3 = Number(fnData.F5513);

    this.maxNum4 = Number(fnData.F5514);
    this.minNum4 = Number(fnData.F5515);
  }
}
