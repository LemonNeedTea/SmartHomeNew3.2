import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Variable } from '../../../providers/model/variable';
import { ToolsProvider } from '../../../providers/tools/tools';
import { NorthPoolValveParams } from '../../../providers/model/model';
/**
 * Generated class for the ValveNorthpoolTimerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-valve-northpool-timer',
  templateUrl: 'valve-northpool-timer.html',
})
export class ValveNorthpoolTimerPage {

  startDate: any;
  timerOpen: any;
  runtime: number;
  loop: any;
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
    let params = new NorthPoolValveParams();//注意组装顺序
    params.loop = this.tools.getNumberByArr(this.loop);
    params.timerOpen = Number(this.timerOpen);
    params.starDate = this.startDate;
    params.runtime = this.runtime;
    return params;
  }
  checkParam(): boolean {
    return true;
  }
  getData() {
    let fnData = Variable.GetFnData('55');
    this.loop = this.tools.getArrayByOneFnData(fnData, '55', 81);
    this.timerOpen = Number(fnData.F5582);
    this.startDate = [fnData.F5583, fnData.F5584];
    this.runtime = fnData.F5585;
  }
}
