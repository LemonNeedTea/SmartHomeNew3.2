import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DeviceRequestsProvider } from '../../providers/tools/requests';
import { ToolsProvider } from '../../providers/tools/tools';
import { EnumDateType } from '../../providers/model/enumdata';

/**
 * Generated class for the MessageHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message-history',
  templateUrl: 'message-history.html',
})
export class MessageHistoryPage {
  parentParams: any;
  name: string;
  messagelists:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private device: DeviceRequestsProvider,
    private tools: ToolsProvider) {
    this.parentParams = this.navParams.get('data');
    let startDate = this.navParams.get("StartDate");
    let stopDate = this.navParams.get("StopDate");
    this.name = this.parentParams.F_Name;

    let start = this.tools.getFullDateStr(startDate, EnumDateType.Day);
    let stop = this.tools.getAddDate(stopDate, EnumDateType.Day);
    this.device.getAlarmHistoryDataList(start, stop, this.parentParams.F_Type).then(res => {
      this.messagelists=res;
    });
  }

  ionViewDidLoad() {

  }

}
