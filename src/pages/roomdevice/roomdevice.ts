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
/**

/**
 * Generated class for the RoomdevicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-roomdevice',
  templateUrl: 'roomdevice.html',
})
export class RoomdevicePage {
  roomID: any;
  roomName: any;
  deviceDataListShow: any = [];
  stateData: any;
  auto: boolean;
  isType: boolean;
  sumNumOpen: number = 0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private device: DeviceRequestsProvider,
    private events: Events) {
    this.roomID = this.navParams.get('id');
    this.roomName = this.navParams.get('name');
    this.isType = this.navParams.get('isType');
    if (this.isType) {
      this.device.getDeviceDataListByTypeID(this.roomID).then(res => {
        this.deviceDataListShow = res;
        this.initFn51();
      });
    } else {
      this.device.getDeviceDataListByRoomID(this.roomID).then(res => {
        this.deviceDataListShow = res;
        this.initFn51();

      });
    }

    this.auto = Variable.isAuto;

    this.events.subscribe("FnData:isAuto", this.eventsIsAutoHandler);
  }
  eventsIsAutoHandler = (data: any) => {
    this.auto = data;
  };
  initFn51() {
    this.getRoomDeviceState(Variable.GetFnData('51'));
    this.events.subscribe("FnData:51", this.getRoomDeviceState);
  }
  getRoomDeviceState = (data: any) => {
    let result = {};
    this.sumNumOpen = 0;
    this.deviceDataListShow.forEach(element => {
      let state = Boolean(data[element.F_ID]);
      result[element.F_ID] = state;
      if (state) this.sumNumOpen++;
    });
    this.stateData = result;
  }
  ionViewDidLoad() {

  }
  ionViewWillEnter() {


  }
  ionViewWillUnload() {
    this.events.unsubscribe("FnData:51", this.getRoomDeviceState);
    this.events.unsubscribe("FnData:isAuto", this.eventsIsAutoHandler);

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
          name: data["F_Name"],
          data:data
        };
        this.navCtrl.push(page, params);
      }
    }
  }
  setDeviceState(id, name, state) {
    Variable.socketObject.setDeviceState(id, name, state);
  }
}

