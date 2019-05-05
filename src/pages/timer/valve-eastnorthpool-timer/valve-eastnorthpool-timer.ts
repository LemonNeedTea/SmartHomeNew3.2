import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Variable } from '../../../providers/model/variable';
import { ToolsProvider } from '../../../providers/tools/tools';
import { NorthCourtPumpParams } from '../../../providers/model/model';
/**
 * Generated class for the ValveEastnorthpoolTimerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-valve-eastnorthpool-timer',
  templateUrl: 'valve-eastnorthpool-timer.html',
})
export class ValveEastnorthpoolTimerPage {
  startDate: any;
  timerOpen: any;
  runtime: number;
  loop: any;
  timerOpen1: any;
  runtime1: number;

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
    Variable.socketObject.setTimer(params);
    this.dismiss();
  }
  getParams() {
    let params = new NorthCourtPumpParams();//注意组装顺序
    params.loop = this.loop;
    params.timerOpen = Number(this.timerOpen);
    params.starDate = this.startDate;
    params.runtime = this.runtime;
    params.timerOpen1 = this.timerOpen1;
    params.runtime1 = this.runtime1;
    return params;
  }
  checkParam(): boolean {
    return true;
  }
  getData() {
    let fnData = Variable.GetFnData('55');
    this.loop = this.tools.getArrayByFnData(fnData, '55', 48, 7);
    this.timerOpen = Number(fnData.F5555);
    this.startDate = [fnData.F5556, fnData.F5557];
    this.runtime = fnData.F5558;
    this.timerOpen1 = Number(fnData.F5559);
    this.runtime1 = fnData.F5560;


  }
}
