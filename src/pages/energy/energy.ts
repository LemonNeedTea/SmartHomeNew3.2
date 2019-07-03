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
  oneData: any = {};//一楼
  twoData: any = {};//二楼
  threeData: any = {};//三楼
  airData: any = {};//空调
  pumpData: any = {};//井水泵
  liftData: any = {};//电梯
  power: any = {};
  v: any = {};
  water: any = {};
  eleType: any;
  waterType: any;

  isFrist:boolean=true;

  eleShowList:Array<any>=[];
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

   
  }
  getEnergyInfoList(){
    this.device.getEnergyInfoList(this.energyType).then((res:any)=>{
      this.eleShowList=res;console.log(res);
      let f54Data = Variable.GetFnData('54');
      let f50Data = Variable.GetFnData('50');
      this.setF50DetailData(f50Data);
      this.setF54DetailData(f54Data);
      if(this.isFrist){
        this.getFnData();
        this.isFrist=false;
      }
    });
    
  }
  getFnData(){
    alert("")
    this.events.subscribe("FnData:50", (res) => {
      this.setF50DetailData(res);
    });
    this.events.subscribe("FnData:54", (res) => {
      this.setF54DetailData(res);
    });
  }
  setF50DetailData(data: any) {
    // if (Object.keys(data).length > 0) {
    //   this.power = {
    //     one: data.F504,
    //     two: data.F508,
    //     three: data.F509,
    //     air: data.F505,
    //     pump: data.F506,
    //     lift: data.F507,
    //   };
    //   this.v = {
    //     a: data.F501,
    //     b: data.F502,
    //     c: data.F503,
    //   };
    // }
    this.setEnergyInfoData(50,data);
  }
  setEnergyInfoData(fnID:number,data:any){
    this.eleShowList.forEach(element => {
      element.data.forEach(element1 => {
        element1.data.forEach(element2 => {
            if(element2.F_FnID==fnID){
              let _temp=data[element2.F_FnCode];
              if(element2.F_Bit<0){
                element2.value=_temp;
              }else{
                element2.value=_temp.split(',')[element2.F_Bit];
              }
            }
        });
      });
    });
    // for (const key in this.eleShowList) {
    //   if (this.eleShowList.hasOwnProperty(key)) {
    //     const element = this.eleShowList[key];
    //     element.name='asdas';
    //     for (const key1 in element.data) {
    //       if (element.hasOwnProperty(key1)) {
    //         const element1 = element.data[key1];
            
    //       }
    //     }
        
    //   }
    // }
  }

  setF54DetailData(data: any) {
    // if (Object.keys(data).length > 0) {
    //   let f541Arr = data.F541.split(',');
    //   let f542Arr = data.F542.split(',');
    //   let f543Arr = data.F543.split(',');
    //   this.oneData = {
    //     ud: f541Arr[0],
    //     um: f541Arr[1],
    //     uy: f541Arr[2],
    //     udh: f542Arr[0],
    //     umh: f542Arr[1],
    //     uyh: f542Arr[2],
    //     udl: f543Arr[0],
    //     uml: f543Arr[1],
    //     uyl: f543Arr[2],
    //   };
    //   let f547Arr = data.F547.split(',');
    //   let f548Arr = data.F548.split(',');
    //   this.twoData = {
    //     ud: f547Arr[0],
    //     um: f547Arr[1],
    //     uy: f547Arr[2],
    //   }
    //   this.threeData = {
    //     ud: f548Arr[0],
    //     um: f548Arr[1],
    //     uy: f548Arr[2],
    //   };

    //   let f544Arr = data.F544.split(',');
    //   let f545Arr = data.F545.split(',');
    //   let f546Arr = data.F546.split(',');
    //   this.airData = {
    //     ud: f544Arr[0],
    //     um: f544Arr[1],
    //     uy: f544Arr[2],
    //   };
    //   this.pumpData = {
    //     ud: f545Arr[0],
    //     um: f545Arr[1],
    //     uy: f545Arr[2],
    //   };
    //   this.liftData = {
    //     ud: f546Arr[0],
    //     um: f546Arr[1],
    //     uy: f546Arr[2],
    //   };
    //   let f549Arr = data.F549.split(',');
    //   this.water = {
    //     ud: f549Arr[0],
    //     um: f549Arr[1],
    //     uy: f549Arr[2],
    //   }




    // }
    this.setEnergyInfoData(54,data);

  }

  ionViewDidLoad() {
  }
  ionViewDidEnter() {
    this.energyTypeChange();
  }
  getEleChart() {
    let nowDateStr = this.tools.getNowDateStr(EnumDateType.Day);
    let start = this.tools.getFullDateStr(nowDateStr, EnumDateType.Day);
    let stop = this.tools.getAddDate(nowDateStr, EnumDateType.Day);
    let params = {
      StartTime: start,
      StopTime: stop,
      Type: EnumChartType.EleFull,
      DateType: EnumDateType.Hour
    };
    this.device.getEnergyChartData(params).then((res: any) => {
      let config = {
        dw: res.DW
      };
      this.chart.getBarChart('chart', res.DataList, config);
    });
  }
  getWaterChart() {
    let nowDateStr = this.tools.getNowDateStr(EnumDateType.Day);
    let start = this.tools.getFullDateStr(nowDateStr, EnumDateType.Day);
    let stop = this.tools.getAddDate(nowDateStr, EnumDateType.Day);
    let params = {
      StartTime: start,
      StopTime: stop,
      Type: EnumChartType.Water,
      DateType: EnumDateType.Hour
    };
    this.device.getEnergyChartData(params).then((res: any) => {
      let config = {
        dw: res.DW
      };
      this.chart.getBarChart('chart', res.DataList, config);
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
  }
  showPopover(myEvent) {
    let eleList = [
      { name: '用电量查询', page: 'EnergyQueryPage', type: EnumChartType.Ele },
      { name: '电负荷查询', page: 'WellpumpqueryPage', type: EnumChartType.FH },
      { name: '空调负荷查询', page: 'WellpumpqueryPage', type: EnumChartType.Air },
    ];
    let waterList = [
      { name: '用水量查询', page: 'EnergyQueryPage', type: EnumChartType.Water }
    ];
    let list;
    if (this.energyType == this.eleType) {
      list = eleList;
    } else {
      list = waterList;
    }

    let popover = this.popoverCtrl.create('PopoverPage', { list: list });
    popover.present({
      ev: myEvent
    });
  }
}
