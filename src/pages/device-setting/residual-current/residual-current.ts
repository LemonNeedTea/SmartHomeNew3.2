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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController,
    private tools: ToolsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResidualCurrentPage');
    this.open = Variable.GetFnData('55','F5596')=='1' ? true : false;
    this.value = Variable.GetFnData('55','F5597');
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
