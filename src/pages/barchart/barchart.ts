import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { chartToolsProvider } from '../../providers/tools/chart';
import { DeviceRequestsProvider } from '../../providers/tools/requests';
import { ToolsProvider } from '../../providers/tools/tools';
import { EnumDateType } from '../../providers/model/enumdata';
import { TranslateService } from "@ngx-translate/core";


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
  tableDataList: any = [];
  dw: string = "";
  sum: number;
  sumDataList=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private device: DeviceRequestsProvider,
    private chart: chartToolsProvider,
    private tools: ToolsProvider,
    private translate: TranslateService) {
    this.parentParams = this.navParams.get("params");
    // this.name = "日期(" + this.parentParams.StartTime + "-" + this.parentParams.StopTime + ")";
  }

  ionViewDidLoad() {
    this.loadChart(this.parentParams);
  }
  async loadChart(data: any) {
    let date;
    await this.translate.get("日期").subscribe(res=>date=res);
    this.name = date+"(" + data.StartTime + "-" + data.StopTime + ")";
    let params = data;
    params.StartTime = this.tools.getFullDateStr(params.StartTime, params.DateType);
    params.StopTime = this.tools.getAddDate(params.StopTime, params.DateType);
    this.device.getEnergyChartData(params).then((res: any) => {
      this.dataList = res.DataList;
      this.tableDataList=this.groupBy(res.DataList);
      this.dw = res.DW;
      this.sum = Number(res.Sum);
      let config = {
        dw: this.dw
      }
      this.chart.getBarChart('chartBar', this.dataList, config);
      this.parentParams = data;
    });
  }

  titleArr=[];
  groupBy(arr:Array<any>){
    let result={};
    let titleArr = [];
    let titleObj = {};
    arr.map(res=>{
      if(!result[res.key]){
        result[res.key]=[];
      }
        result[res.key].push(res);

      if (titleArr.indexOf(res.type)<0){
        titleArr.push(res.type);
        titleObj[res.type]=[];
      }
      titleObj[res.type].push(res);


    });
    let result1 = [];

    for (let key in result) {
      result1.push(result[key]);
    }
    this.titleArr=titleArr;
    // 求和
    for(let key in titleObj){
      let sum=0;
      titleObj[key].map(res=>{
        sum+=res.value;
      });
      this.sumDataList.push(sum.toFixed(2));
    }
    return result1;
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
