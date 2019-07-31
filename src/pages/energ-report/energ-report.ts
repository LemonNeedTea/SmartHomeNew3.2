import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { chartToolsProvider } from '../../providers/tools/chart';
import { DeviceRequestsProvider } from '../../providers/tools/requests';
import { ToolsProvider } from '../../providers/tools/tools';


/**
 * Generated class for the EnergReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-energ-report',
  templateUrl: 'energ-report.html',
})
export class EnergReportPage {
  parentParams: any = {};
  pet: string = "day";
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private chart: chartToolsProvider,
    private device: DeviceRequestsProvider,
    private tools: ToolsProvider) {
    this.parentParams = this.navParams.get("Data");
  }

  ionViewDidLoad() {
    // var data = [{
    //   const: 'const',
    //   type: '峰电量',
    //   number: 0.6
    // }, {
    //   const: 'const',
    //   type: '谷电量',
    //   number: 0.4
    // }];
    // this.chart.getPieChart('mountNode', data);

    // var data1 = [{
    //   const: 'const',
    //   type: '照明插座',
    //   number: 0.1
    // }, {
    //   const: 'const',
    //   type: '空调',
    //   number: 0.2
    // }, {
    //   const: 'const',
    //   type: '新风空调',
    //   number: 0.3
    // }, {
    //   const: 'const',
    //   type: '其他',
    //   number: 0.4
    // }];
    // this.chart.getPieChart('mountNode1', data1);
    // let params={
    //   StartTime:'2019-06-01 00:00',
    //   StopTime:'2019-07-01 00:00',
    //   DateType:'month'
    // };
    this.timeRange();


  }
  loadChart(params: any) {
    this.device.getEnergyPieChart(params).then((res: any) => {
      if (res.chart) {
        this.chart.getPieChart('mountNode', res.chart, '度');
      }
      if (res.chart1) {
        this.chart.getPieChart('mountNode1', res.chart1, '度');
      }
    })
  }
  timeRange() {
    let data;
    switch (this.pet) {
      case 'year': {
        data = this.tools.getYearRange();
        break;
      }
      case 'month': {
        data = this.tools.getMonthRange();

        break;
      }
      case 'day': {
        data = this.tools.getNowDay();

        break;
      }

    }
    data.DateType = this.pet;
    this.loadChart(data);
  }



}
