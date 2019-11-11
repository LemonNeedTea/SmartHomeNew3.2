import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController } from 'ionic-angular';
import { Variable } from '../../../providers/model/variable';
import { DeviceRequestsProvider } from '../../../providers/tools/requests'

/**
 * Generated class for the CurtainSettingHuaianPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-curtain-setting-huaian',
  templateUrl: 'curtain-setting-huaian.html',
})
export class CurtainSettingHuaianPage {

  name: string;
  id: number;
  state: number;
  auto: boolean;
  fnID: string;
  saturation: number = 0;
  monitorID: number;
  curtainInfo: any = {
    openFnID: 0,
    timerSetFnID: 0,
    timerRoadID: 0,
    timerGetFnID: 0
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private events: Events,
    private device: DeviceRequestsProvider,
    public modalCtrl: ModalController,

  ) {
    this.id = this.navParams.get("id");
    this.name = this.navParams.get("name");
    this.monitorID = this.navParams.get("monitorID");
    this.getCurtainInfo();
    Variable.socketObject.getFnData(this.curtainInfo.timerGetFnID, this.monitorID);


    this.fnID = 'state';
    let fnData = Variable.GetFnData(this.fnID);
    this.getDeviceState1(fnData);
    this.events.subscribe(`FnData:${this.fnID}`, this.eventsFn51Handler);
  }

  private eventsFn51Handler = (data: any) => {
    this.getDeviceState1(data);
  }
  /**end***/

  getDeviceState1(data: any) {
    if (data) {
      this.state = data[this.id][0];
    }
  }
  //获取窗帘设置和获取信息
  getCurtainInfo() {
    if (this.monitorID == 16) {
      switch (this.id) {
        case 59: {
          this.curtainInfo = {
            openFnID: 21,
            timerSetFnID: 23,
            timerRoadID: 1,
            timerGetFnID: 9
          };
          break;
        }
        case 60: {
          this.curtainInfo = {
            openFnID: 22,
            timerSetFnID: 23,
            timerRoadID: 2,
            timerGetFnID: 9
          };
          break;
        }
      }

    } else if (this.monitorID == 17 || this.monitorID == 18) {
      switch (this.id) {
        case 71: case 74: {
          this.curtainInfo = {
            openFnID: 33,
            timerSetFnID: 36,
            timerRoadID: 1,
            timerGetFnID: 11
          };
          break;
        }
        case 72: case 75: {
          this.curtainInfo = {
            openFnID: 34,
            timerSetFnID: 36,
            timerRoadID: 2,
            timerGetFnID: 11
          };
          break;
        }
        case 73: case 76: {
          this.curtainInfo = {
            openFnID: 35,
            timerSetFnID: 36,
            timerRoadID: 3,
            timerGetFnID: 11
          };
          break;
        }
      }
    }
  }

  ionViewDidLoad() {
  }
  getDeviceState(data: any) {
    if (data) {
      let state = data.F728;
      let kaidu = data.F727;

      if (this.setInfo) {
        if (kaidu == this.setInfo.kaidu && state == this.setInfo.state) {
          // debugger;

          // this.state = state;
          this.saturation = kaidu;
          this.dismissLoading();

        }
      } else {
        // this.state = state;
        this.saturation = kaidu;
      }

    }
  }
  dismissLoading() {
    this.setInfo = null;
    Variable.socketObject.dismissLoading();
  }

  setInfo: any;
  setDeviceState(num) {
    switch (num) {
      case 1: { this.state = 1; break; }
      case 2: { this.state = 0; break; }
      case 3: { this.state = 2; break; }
    }
    Variable.socketObject.sendMessage(this.monitorID, this.curtainInfo.openFnID, num);

  }

  ionViewWillUnload() {
    this.events.unsubscribe(`FnData:${this.fnID}`, this.eventsFn51Handler);

  }

  timerObj: any;
  rangeChange() {
    if (!this.timerObj) {
      this.timerObj = setTimeout(() => {
        console.log(this.saturation);
        Variable.socketObject.sendMessage(this.monitorID, this.curtainInfo.openFnID, this.saturation * 1 + 10, false);



        // console.log(this.saturation);
        // this.setDeviceState(this.saturation, 1);
        clearTimeout(this.timerObj);
        this.timerObj = null;
      }, 500);
    }


  }
  presentShowModal() {
    let profileModal = this.modalCtrl.create('DeviceCurtainTimerPage', { name: this.name, curtainInfo: this.curtainInfo, monitorID: this.monitorID });
    profileModal.onDidDismiss(data => {
    });
    profileModal.present();
  }

}
