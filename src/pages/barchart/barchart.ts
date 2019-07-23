import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { chartToolsProvider } from '../../providers/tools/chart';
import { DeviceRequestsProvider } from '../../providers/tools/requests';
import { ToolsProvider } from '../../providers/tools/tools';
import { EnumDateType } from '../../providers/model/enumdata';

/**
 * Generated class for the BarchartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-barchart',
  templateUrl: 'barchart.html',
})
export class BarchartPage {
  parentParams: any;
  name: string;
  dataList: any = [];
  dw: string = "";
  sum: number;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private device: DeviceRequestsProvider,
    private chart: chartToolsProvider,
    private tools: ToolsProvider) {
    this.parentParams = this.navParams.get("params");
    // this.name = "日期(" + this.parentParams.StartTime + "-" + this.parentParams.StopTime + ")";
  }

  ionViewDidLoad() {
    this.loadChart(this.parentParams);
  }
  loadChart(data: any) {
    this.name = "日期(" + data.StartTime + "-" + data.StopTime + ")";
    let params = data;
    params.StartTime = this.tools.getFullDateStr(params.StartTime, params.DateType);
    params.StopTime = this.tools.getAddDate(params.StopTime, params.DateType);
    this.device.getEnergyChartData(params).then((res: any) => {
      this.dataList = res.DataList;
      this.dw = res.DW;
      this.sum = Number(res.Sum);
      let config = {
        dw: this.dw
      }
      this.chart.getBarChart('chartBar', this.dataList, config);
      this.parentParams = data;
    });
  }
  goDetail(data: string) {
    let childParams: any;
    switch (this.parentParams.DateType) {
      case EnumDateType.Year: {
        childParams = this.tools.getYearRange(data);
        break;
      }
      case EnumDateType.Month: {
        childParams = this.tools.getMonthRange(data);
        break;
      }
      case EnumDateType.Day: {
        let yearStr = this.parentParams.StartTime.substring(0, 5);
        childParams = this.tools.getDayRange(yearStr + data);
      }
    }
    if (childParams) {
      this.parentParams.StartTime=childParams.StartTime;
      this.parentParams.StopTime=childParams.StopTime;
      this.parentParams.DateType=childParams.DateType;
      this.loadChart(this.parentParams);
    }

  }

}
