import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { DeviceRequestsProvider } from '../../providers/tools/requests';
import { ToolsProvider } from '../../providers/tools/tools';
import { Variable } from '../../providers/model/variable';
import{ ConfigProvider } from '../../providers/config/config'

@IonicPage()
@Component({
  selector: 'page-device',
  templateUrl: 'device.html',
})
export class DevicePage {
  typeDataList: any;
  deviceDataList: any;
  deviceTypeDataList: any;
  deviceDataListShow: any;
  typeID: string;
  stateData: any = {};
  deviceStateData: any = {};
  auto: boolean;
  sumNumOPen: number = 0;
  sumNum: number = 0;
  private openStateNumArr: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private device: DeviceRequestsProvider,
    private events: Events,
    private tools: ToolsProvider,
    private el: ElementRef,
    public config: ConfigProvider
    ) {
    this.getIsAuto();

    this.loadDataNew().then(res => {
      this.getFn51Data();
    })


  }

  loadDataNew() {
    return new Promise((reject) => {
      this.device.getDevicePageInfo().then((res: object) => {
        this.deviceTypeDataList = res['deviceTypeDataList'];
        this.typeDataList = res['typeDataList'];
        this.deviceDataList = res['deviceDataList'];



        this.cleanNum(this.typeDataList);
        this.typeID = this.typeDataList[0]['F_ID'];//默认选中第一个类型
        this.getRightCateData(this.typeID);
        reject(true);

      });
    });

  }

  cleanNum(data: any) {
    let openStateNumArr = {};
    let sumNum = 0;
    data.forEach(element => {
      openStateNumArr[element.F_ID] = 0;
      sumNum += element.F_DeviceNum;
    });
    this.openStateNumArr = openStateNumArr;
    this.sumNum = sumNum;
  }

  // loadListData() {
  //   this.openStateNumArr = {};
  //   this.sumNum = 0;
  //   return new Promise(reject => {
  //     this.device.getDeviceIDtoTypeID().then((ress: any) => {
  //       this.deviceTypeDataList = ress;
  //       this.device.getDeviceTypeDataList().then((res: any) => {
  //         this.typeDataList = res;
  //         res.forEach(element => {
  //           this.openStateNumArr[element.F_ID] = 0;
  //           this.sumNum += element.F_DeviceNum;
  //         });

  //         this.typeID = res[0]['F_ID'];
  //         this.device.getDeviceDataList().then(res => {
  //           this.deviceDataList = res;
  //           this.getRightCateData(this.typeID);
  //           // this.getFn51Data();
  //           reject(true);


  //         });
  //       });
  //     });
  //   })
  // }

  ionViewDidEnter() {
    // if (!this.isFirst) {
    //   this.getIsAuto();
    //   this.getFn51Data();
    // }

  }
  getIsAuto() {
    this.auto = Variable.isAuto;
    this.events.subscribe("FnData:isAuto", (data) => {
      this.auto = data;
    });
  }
  getFn51Data() {
    let data = Variable.GetFnData('state');
    this.getTypeDeviceNum(data);
    this.events.subscribe("FnData:state", (res) => {
      this.getTypeDeviceNum(res);
    });
  }
  // ionViewDidLeave() {
  //   this.events.unsubscribe("FnData:51",()=>{});
  //   this.events.unsubscribe("FnData:isAuto",()=>{});
  // }
  getTypeDeviceNum(data: any) {
    this.sumNumOPen = 0;
    let sumNumOPen = 0;

    let result = JSON.parse(JSON.stringify(this.openStateNumArr));

    let deviceStateData = {};
    for (const key in data) {
      if (data.hasOwnProperty(key) && Number(key) > 0) {
        deviceStateData[key] = data[key][0];
        let typeID = this.deviceTypeDataList[key];
        let element = data[key][0];
        if (element == 1) {
          sumNumOPen++;
          result[typeID]++;
        }
      }

    };
    this.sumNumOPen = sumNumOPen;
    this.stateData = result;
    this.deviceStateData = deviceStateData;
  }
  getRightCateData(typeID: string) {
    // this.tools.showAnimatePulse(this.el,`type${typeID}`)
    this.typeID = typeID;
    this.deviceDataListShow = new Array<any>();
    this.deviceDataList.forEach(item => {
      if (item['F_TypeID'] == typeID) {
        item["class"] = "device" + item["F_ID"];
        this.deviceDataListShow.push(item);
      }
    });
  }
  setDeviceState(id, name, state) {
    // this.tools.showAnimatePulse(`device${id}`);
    this.tools.showAnimatePulse(this.el, `device${id}`, true);
    Variable.socketObject.setDeviceState(id, name, state);
  }
  goSetting(data: any) {
    if (data.F_ShowSetting) {
      let page: any;
      switch (data['F_SettingRouter']) {
        case "setting_pump": {
          page = 'WellpumpPage'; break;
        }
        case "setting_curtain": {
          page = 'CurtainSettingPage'; break
        }
        case "setting_smartdoor": {
          page = 'DoorSettingPage'; break
        }
        case "setting-northPump": {
          page = 'PumpEastnorthpoolSettingPage'; break
        }
        case "setting_pg": {
          page = 'PumpNorthcourtSettingPage'; break
        }
        case "setting_dcf": {
          page = 'ValveEastcourtSettingPage'; break
        }
        case "setting-eastNorthDCF": {
          page = 'ValveEastnorthpoolSettingPage'; break
        }
        case "setting_lift": {
          page = 'LiftSettingPage'; break
        }
        default: {
          page = data['F_SettingRouter']; break;
        }
      }
      if (page) {
        let params = {
          id: data["F_ID"],
          name: this.config.chinese ? data["F_Name"] : data["F_Name_En"],
          monitorID: data["F_MonitorID"],
          data: data
        };
        this.navCtrl.push(page, params);
      }
    }
  }
  goRoomDevice(id: string, name: string) {
    this.navCtrl.push('RoomdevicePage', { id: id, name: name, isType: true });
  }
  doRefresh(refresher) {
    this.loadDataNew().then(res => {
      refresher.complete();
    });
    setTimeout(() => {
      refresher.complete();
    }, 10000);
  }
}
