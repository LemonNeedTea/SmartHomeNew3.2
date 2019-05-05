import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { chartToolsProvider } from '../../providers/tools/chart';
import { DeviceRequestsProvider } from '../../providers/tools/requests';
import { ToolsProvider } from '../../providers/tools/tools';
import { EnumDateType, EnumChartType } from '../../providers/model/enumdata';
/**
 * Generated class for the LinechartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-linechart',
  templateUrl: 'linechart.html',
})
export class LinechartPage {
  name: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private device: DeviceRequestsProvider,
    private chart: chartToolsProvider,
    private tools: ToolsProvider) {
    let startDate = this.navParams.get('StartDate');
    let stopDate = this.navParams.get('StopDate');
    let type: EnumChartType = this.navParams.get('type');

    this.name = "日期(" + startDate + "-" + stopDate + ")";

    let start = this.tools.getFullDateStr(startDate, EnumDateType.Day);
    let stop = this.tools.getAddDate(stopDate, EnumDateType.Day);


    this.device.getWaterlevelMapChartData(start, stop, type).then((res: any) => {
      console.log(res);
      let config = {
        dw: res.DW
      }
      this.chart.getLineChart('chart1', res.DataList, config);
    });
  }

  ionViewDidLoad() {
  }

}
