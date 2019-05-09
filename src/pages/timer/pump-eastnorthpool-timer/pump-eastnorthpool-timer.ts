import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Variable } from '../../../providers/model/variable';
import { ToolsProvider } from '../../../providers/tools/tools';
// import { EastnorthpoolPumpParams } from '../../../providers/model/model';

/**
 * Generated class for the PumpEastnorthpoolTimerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pump-eastnorthpool-timer',
  templateUrl: 'pump-eastnorthpool-timer.html',
})
export class PumpEastnorthpoolTimerPage {
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
    // let params = new EastnorthpoolPumpParams();//注意组装顺序
    // params.loop = this.loop;
    // params.timerOpen = Number(this.timerOpen);
    // params.starDate = this.startDate;
    // params.runtime = this.runtime;
    // return params;
  }
  checkParam(): boolean {
    return true;
  }
  getData() {
    let fnData = Variable.GetFnData('55');
    this.loop = this.tools.getArrayByFnData(fnData, '55', 81, 7);
    this.timerOpen = Number(fnData.F5588);
    this.startDate = [fnData.F5589, fnData.F5590];
    this.runtime = fnData.F5591;
  }

}
