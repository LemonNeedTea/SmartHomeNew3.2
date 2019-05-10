import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { DeviceRequestsProvider } from '../../providers/tools/requests';
import { Variable } from '../../providers/model/variable';
// import { WellpumpPage } from '../wellpump/wellpump';
// import { CurtainSettingPage } from '../device-setting/curtain-setting/curtain-setting';
// import { DoorSettingPage } from '../device-setting/door-setting/door-setting';
// import { LiftSettingPage } from '../device-setting/lift-setting/lift-setting';
// import { PumpEastnorthpoolSettingPage } from '../device-setting/pump-eastnorthpool-setting/pump-eastnorthpool-setting';
// import { PumpNorthcourtSettingPage } from '../device-setting/pump-northcourt-setting/pump-northcourt-setting';
// import { ValveEastcourtSettingPage } from '../device-setting/valve-eastcourt-setting/valve-eastcourt-setting';
// import { ValveEastnorthpoolSettingPage } from '../device-setting/valve-eastnorthpool-setting/valve-eastnorthpool-setting';
// import { RoomdevicePage } from '../../pages/roomdevice/roomdevice';

/**
 * Generated class for the DevicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
  stateData1: any = {};
  auto: boolean;
  sumNumOPen: number = 0;
  sumNum: number = 0;
  private openStateNumArr: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private device: DeviceRequestsProvider,
    private events: Events) {
    this.getIsAuto();
    // this.device.getDeviceTypeDataList().then((res: any) => {
    //   this.typeDataList = res;
    //   res.forEach(element => {
    //     this.openStateNumArr[element.F_ID] = 0;
    //     this.sumNum += element.F_DeviceNum;
    //   });

    this.device.getDeviceIDtoTypeID().then((ress: any) => {
      this.deviceTypeDataList = ress;

    });
    // });
    this.device.getDeviceTypeDataList().then((res: any) => {
      this.typeDataList = res;
      res.forEach(element => {
        this.openStateNumArr[element.F_ID] = 0;
        this.sumNum += element.F_DeviceNum;
      });

      this.typeID = res[0]['F_ID'];
      this.device.getDeviceDataList().then(res => {
        this.deviceDataList = res;
        this.getRightCateData(this.typeID);
        this.getFn51Data();


      });
    });
  }

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
      //  console.log(data);
    });
  }
  getFn51Data() {
    let data = Variable.GetFnData('51'); this.stateData1 = data;
    this.getTypeDeviceNum(data);
    this.events.subscribe("FnData:51", (res) => {
      this.stateData1 = res;
      this.getTypeDeviceNum(res);
    });
  }
  // ionViewDidLeave() {
  //   this.events.unsubscribe("FnData:51",()=>{});
  //   this.events.unsubscribe("FnData:isAuto",()=>{});
  //   console.log('ionViewDidLeave')
  // }
  getTypeDeviceNum(data: any) {
    this.sumNumOPen = 0;
    let sumNumOPen = 0;
    let result = JSON.parse(JSON.stringify(this.openStateNumArr));
    console.log(result);

    for (const key in data) {
      if (data.hasOwnProperty(key) && Number(key) > 0) {
        const state = data[key];
        let typeID = this.deviceTypeDataList[key];
        let element = data[key];
        if (Boolean(element)) {
          sumNumOPen++;
          result[typeID]++;
        }
      }
      // console.log(result);

    };
    this.sumNumOPen = sumNumOPen;
    this.stateData = result;
  }
  getRightCateData(typeID: string) {
    this.typeID = typeID;
    this.deviceDataListShow = new Array<any>();
    this.deviceDataList.forEach(item => {
      if (item['F_TypeID'] == typeID) {
        this.deviceDataListShow.push(item);
      }
    });
  }
  setDeviceState(id, name, state) {
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
          name: data["F_Name"]
        };
        this.navCtrl.push(page, params);
      }
    }
  }
  goRoomDevice(id: string, name: string) {
    this.navCtrl.push('RoomdevicePage', { id: id, name: name, isType: true });
  }
}
