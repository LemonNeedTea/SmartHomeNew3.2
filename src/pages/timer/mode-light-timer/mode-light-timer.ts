import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Variable } from '../../../providers/model/variable';
import { ToolsProvider } from '../../../providers/tools/tools';
import { LightModeParams } from '../../../providers/model/model';

/**
 * Generated class for the ModeLightTimerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mode-light-timer',
  templateUrl: 'mode-light-timer.html',
})
export class ModeLightTimerPage {

  timerOpen: any;
  startDate: any;
  stopDate: any;
  stopDate1: any;

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
    let params = this.getParams();
    if (this.checkParam()) {
      Variable.socketObject.setTimer(params);
      this.dismiss();
    }

  }
  getParams() {
    let params = new LightModeParams();//注意组装顺序
    params.timerOpen = Number(this.timerOpen);
    params.starDate = this.startDate;
    params.stopDate = this.stopDate;
    params.stopDate1 = this.stopDate1;
    return params;
  }

  checkParam(): boolean {
    return true;
  }
  getData() {
    let fnData = Variable.GetFnData('55');
    this.timerOpen = Number(fnData.F5525);
    this.startDate = [fnData.F5526, fnData.F5527];
    this.stopDate = [fnData.F5528, fnData.F5529];
    this.stopDate1 = [fnData.F5530, fnData.F5531];
  }

}
