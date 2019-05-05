import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';
// import { LinechartPage } from '../linechart/linechart';
import { EnumDateType, EnumChartType } from '../../providers/model/enumdata';
// import { MessageHistoryPage } from '../message-history/message-history';



/**
 * Generated class for the WellpumpqueryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wellpumpquery',
  templateUrl: 'wellpumpquery.html',
})
export class WellpumpqueryPage {
  name: any;
  startDate: any;
  stopDate: any;
  type: string;
  data: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private tools: ToolsProvider) {
    let nowDate = this.tools.getNowDateStr(EnumDateType.Day);
    this.startDate = nowDate;
    this.stopDate = nowDate;
    this.name = this.navParams.get('name');
    this.type = this.navParams.get('type');
    this.data = this.navParams.get('data');
  }

  ionViewDidLoad() {

  }
  goLineChartPage() {
    if (this.type == EnumChartType.Message) {
      this.navCtrl.push('MessageHistoryPage', { StartDate: this.startDate, StopDate: this.stopDate, data: this.data });
    } else {
      this.navCtrl.push('LinechartPage', { StartDate: this.startDate, StopDate: this.stopDate, type: this.type })
    }
  }

}
