import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';
// import { LinechartPage } from '../linechart/linechart';
import { EnumDateType, EnumChartType } from '../../providers/model/enumdata';
// import { MessageHistoryPage } from '../message-history/message-history';
import { DeviceRequestsProvider } from '../../providers/tools/requests';



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
  messageData: any;
  queryID: number
  queryData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private tools: ToolsProvider,
    private device: DeviceRequestsProvider) {
    let nowDate = this.tools.getNowDateStr(EnumDateType.Day);
    this.startDate = nowDate;
    this.stopDate = nowDate;
    // this.name = this.navParams.get('name');
    // this.type = this.navParams.get('type');
    // this.data = this.navParams.get('data');


    this.queryID = this.navParams.get('queryID');
    this.type = this.navParams.get("type");
    this.data = this.navParams.get("Data");

    if (this.type == null) {
      this.name = this.data.F_MenuName;
      this.messageData = this.data.data;
    } else {
      if (this.type == 'env') {
        this.queryData = this.data;
        this.name = this.queryData.F_Name;
      } else {
        this.device.getEnergyQuery(this.queryID).then((res: any) => {
          this.queryData = res[0];
          this.name = this.queryData.F_Name;
        });
      }

    }


  }

  ionViewDidLoad() {

  }
  goLineChartPage() {
    if (this.type == null) {
      this.navCtrl.push('MessageHistoryPage', { StartDate: this.startDate, StopDate: this.stopDate, data: this.messageData });
    } else {
      let params: any = {};
      params.ObjType = this.queryData.F_SortIndex;
      params.FnID = this.queryData.F_GPRSFnID;
      params.MonitorID = this.queryData.F_MonitorID;
      params.StartTime = this.startDate;
      params.StopTime = this.stopDate;
      this.navCtrl.push('LinechartPage', { params: params })
    }
  }

}
