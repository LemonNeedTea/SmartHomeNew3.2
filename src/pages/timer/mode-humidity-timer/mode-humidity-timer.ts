import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Variable } from '../../../providers/model/variable';
import { ToolsProvider } from '../../../providers/tools/tools';
import { CurtainModeParams, HumidityParams } from '../../../providers/model/model';
/**
 * Generated class for the ModeHumidityTimerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mode-humidity-timer',
  templateUrl: 'mode-humidity-timer.html',
})
export class ModeHumidityTimerPage {

  timerOpen: any;
  tempMaxNum1: number;
  tempMinNum1: number;
  humiMaxNum1: number;
  humiMinNum1: number;

  tempMaxNum2: number;
  tempMinNum2: number;
  humiMaxNum2: number;
  humiMinNum2: number;

  tempMaxNum3: number;
  tempMinNum3: number;
  humiMaxNum3: number;
  humiMinNum3: number;


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
    let params = new HumidityParams();//注意组装顺序
    params.timerOpen = Number(this.timerOpen);
    params.tempMaxNum1 = this.tempMaxNum1;
    params.tempMinNum1 = this.tempMinNum1;
    params.humiMaxNum1 = this.humiMaxNum1;
    params.humiMinNum1 = this.humiMinNum1;

    params.tempMaxNum2 = this.tempMaxNum2;
    params.tempMinNum2 = this.tempMinNum2;
    params.humiMaxNum2 = this.humiMaxNum2;
    params.humiMinNum2 = this.humiMinNum2;

    params.tempMaxNum3 = this.tempMaxNum3;
    params.tempMinNum3 = this.tempMinNum3;
    params.humiMaxNum3 = this.humiMaxNum3;
    params.humiMinNum3 = this.humiMinNum3;
    
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
    this.timerOpen = Number(fnData.F5516);

    this.tempMaxNum1 = Number(fnData.F5517);
    this.tempMinNum1 = Number(fnData.F5518);
    this.humiMaxNum1 = Number(fnData.F5519);
    this.humiMinNum1 = Number(fnData.F5520);

    this.tempMaxNum2 = Number(fnData.F5521);
    this.tempMinNum2 = Number(fnData.F5522);
    this.humiMaxNum2 = Number(fnData.F5523);
    this.humiMinNum2 = Number(fnData.F5524);

    this.tempMaxNum3 = Number(fnData.F5525);
    this.tempMinNum3 = Number(fnData.F5526);
    this.humiMaxNum3 = Number(fnData.F5527);
    this.humiMinNum3 = Number(fnData.F5528);
  }
}
