import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Variable } from '../../../providers/model/variable';
import { ToolsProvider } from '../../../providers/tools/tools';
import { LighJWModeParams } from '../../../providers/model/model';
/**
 * Generated class for the ModeLightJwTimerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mode-light-jw-timer',
  templateUrl: 'mode-light-jw-timer.html',
})
export class ModeLightJwTimerPage {


  runtime: number;
  runtime1: number;
  timerOpen: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController,
    private tools: ToolsProvider) {
    this.getData();
  }

  ionViewDidLoad() {
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  complate() {
    if (this.checkParam()) {

      let params = this.getParams();
      Variable.socketObject.setTimer(params);
      this.dismiss();
    }

  }
  getParams() {
    let params = new LighJWModeParams();//注意组装顺序
    params.timerOpen = Number(this.timerOpen);
    params.runtime = Number(this.runtime);
    params.runtime1 = Number(this.runtime1);
    return params;
  }
  checkParam(): boolean {
    if (this.runtime > 240) {
      this.tools.presentToast("延时关闭时长不能超过4小时");
      return false;
    }
    if (this.runtime1 > 240) {
      this.tools.presentToast("偏移时间时长不能超过4小时");
      return false;
    }
    return true;
  }
  getData() {
    let fnData = Variable.GetFnData('55');
    this.timerOpen = Number(fnData.F5578);
    this.runtime = fnData.F5579;
    this.runtime1 = fnData.F5580;
  }

}
