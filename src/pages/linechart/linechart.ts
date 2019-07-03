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
  parentParams:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private device: DeviceRequestsProvider,
    private chart: chartToolsProvider,
    private tools: ToolsProvider) {
      this.parentParams = this.navParams.get("params");

    this.name = "日期(" + this.parentParams.StartTime + "-" + this.parentParams.StopTime + ")";

    let start = this.tools.getFullDateStr(this.parentParams.StartTime, EnumDateType.Day);
    let stop = this.tools.getAddDate(this.parentParams.StopTime, EnumDateType.Day);

      this.parentParams.StartTime=start;
      this.parentParams.StopTime=stop;
    this.device.getWaterlevelMapChartData(this.parentParams).then((res: any) => {
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
