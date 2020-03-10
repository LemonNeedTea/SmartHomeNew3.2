import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ToolsProvider } from '../../../providers/tools/tools';
import { Variable } from '../../../providers/model/variable';


/**
 * Generated class for the ResidualCurrentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-residual-current',
  templateUrl: 'residual-current.html',
})
export class ResidualCurrentPage {
  open: boolean;
  value: number;
  fnData: any = {};
  num: number;
  lastDate: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController,
    private tools: ToolsProvider) {
  }

  ionViewDidLoad() {
    const fnData = Variable.GetFnData('55');
    this.open = fnData['F5596']=='1' ? true : false;
    this.value = fnData['F5597'];

    const fn51Data = Variable.GetFnData('51');
    this.num = parseInt(fn51Data['F5119']);
    this.lastDate = fn51Data['F5120'];
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  complate() {
    Variable.socketObject.sendMessage(1, 41, `13,${this.open ? 1 : 0},${this.value}`);

    this.dismiss();
    // let params = this.getParams();
    // if (this.checkParam()) {
    //   Variable.socketObject.setTimer(params);
    //   this.dismiss();
    // }

  }

}
