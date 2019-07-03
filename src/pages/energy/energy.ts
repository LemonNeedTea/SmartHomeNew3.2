import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';
import { DeviceRequestsProvider } from '../../providers/tools/requests';
import { chartToolsProvider } from '../../providers/tools/chart';
import { Variable } from '../../providers/model/variable';
import { PopoverController } from 'ionic-angular';
// import { PopoverPage } from '../popover/popover';
// import { WellpumpqueryPage } from '../wellpumpquery/wellpumpquery';
// import { EnergyQueryPage } from '../energy-query/energy-query';
import { EnumEnergyType, EnumDateType, EnumChartType } from '../../providers/model/enumdata';

/**
 * Generated class for the EnergyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-energy',
  templateUrl: 'energy.html',
})
export class EnergyPage {
  energyType: any;
  eleType: any;
  waterType: any;

  isFrist: boolean = true;
  fnIDArr: Array<number> = [];

  eleShowList: Array<any> = [];
  type:any={ele:true,water:true};
  poperList:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private tools: ToolsProvider,
    private device: DeviceRequestsProvider,
    private chart: chartToolsProvider,
    private events: Events,
    private popoverCtrl: PopoverController) {
    this.eleType = EnumEnergyType.Ele;
    this.waterType = EnumEnergyType.Water;
    this.energyType = this.eleType;
    // this.getEnergyInfoList();
    this.device.getEnergyType().then(res=>{
      this.type=res;
    })


  }
  getEnergyInfoList() {
    this.device.getEnergyInfoList(this.energyType).then((res: any) => {
      this.eleShowList = res.main;

      res.fn.forEach(element => {
        let fnData = Variable.GetFnData(element);
        this.setEnergyInfoData(element, fnData);

        let id: boolean = this.fnIDArr.indexOf(element) >= 0;
        if (id == false) {
          this.fnIDArr.push(element);
          this.events.subscribe(`FnData:${element}`, (res1) => {
            this.setEnergyInfoData(element, res1);
          });
        }

      });
    });

  }
  setEnergyInfoData(fnID: number, data: any) {
    this.eleShowList.forEach(element => {
      element.data.forEach(element1 => {
        element1.data.forEach(element2 => {
          if (element2.F_FnID == fnID) {
            let _temp = data[element2.F_FnCode];
            if (element2.F_Bit < 0) {
              element2.value = _temp;
            } else {
              element2.value = _temp.split(',')[element2.F_Bit];
            }
          }
        });
      });
    });
  }

  ionViewDidLoad() {
  }
  ionViewDidEnter() {
    this.energyTypeChange();
  }
  getEleChart() {

    this.device.getEnergyQuery(-1).then((queryData:any) => {
      let data=queryData[0];
      let nowDateStr = this.tools.getNowDateStr(EnumDateType.Day);
      let start = this.tools.getFullDateStr(nowDateStr, EnumDateType.Day);
      let stop = this.tools.getAddDate(nowDateStr, EnumDateType.Day);
      let params = {
        MonitorID: data.F_MonitorID,
        ObjType: data.F_SortIndex,
        StartTime: start,
        StopTime: stop,
        DateType: EnumDateType.Hour,
        FnID: data.F_GPRSFnID
      };
      this.device.getEnergyChartData(params).then((res: any) => {
        let config = {
          dw: res.DW
        };
        this.chart.getBarChart('chart', res.DataList, config);
      });

    });

   
  }
  getWaterChart() {
    this.device.getEnergyQuery(-2).then((queryData:any) => {
      let data=queryData[0];
      let nowDateStr = this.tools.getNowDateStr(EnumDateType.Day);
      let start = this.tools.getFullDateStr(nowDateStr, EnumDateType.Day);
      let stop = this.tools.getAddDate(nowDateStr, EnumDateType.Day);
      let params = {
        MonitorID: data.F_MonitorID,
        ObjType: data.F_SortIndex,
        StartTime: start,
        StopTime: stop,
        DateType: EnumDateType.Hour,
        FnID: data.F_GPRSFnID
      };
      this.device.getEnergyChartData(params).then((res: any) => {
        let config = {
          dw: res.DW
        };
        this.chart.getBarChart('chart', res.DataList, config);
      });

    });
  }
  energyTypeChange() {
    switch (this.energyType) {
      case this.eleType: {
        this.getEleChart();
        this.getEnergyInfoList();
        break;
      }
      case this.waterType: {
        this.getWaterChart();
        this.getEnergyInfoList();
        break;
      }
    }
    this.device.getMenuList(this.energyType).then(res=>{
      this.poperList=res;
    });
  }
  showPopover(myEvent) {
    // let eleList = [
    //   { name: '用电量查询', page: 'EnergyQueryPage', type: EnumChartType.Ele },
    //   { name: '电负荷查询', page: 'WellpumpqueryPage', type: EnumChartType.FH },
    //   { name: '空调负荷查询', page: 'WellpumpqueryPage', type: EnumChartType.Air },
    // ];
    // let waterList = [
    //   { name: '用水量查询', page: 'EnergyQueryPage', type: EnumChartType.Water }
    // ];
    // let list;
    // if (this.energyType == this.eleType) {
    //   list = eleList;

    // } else {
    //   list = waterList;
    // }
      let popover = this.popoverCtrl.create('PopoverPage', { list: this.poperList });
      popover.present({
        ev: myEvent
      });

  
  }
}
