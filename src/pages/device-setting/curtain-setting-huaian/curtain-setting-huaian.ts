import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController } from 'ionic-angular';
import { Variable } from '../../../providers/model/variable';
import { DeviceRequestsProvider } from '../../../providers/tools/requests';
import { ToolsProvider } from '../../../providers/tools/tools'

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
  nameEn: string;
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
  isNotQunKong:boolean=true;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private events: Events,
    private device: DeviceRequestsProvider,
    public modalCtrl: ModalController,
    public tools: ToolsProvider,

  ) {
    this.id = this.navParams.get("id");
    this.name = this.navParams.get("name");
    this.nameEn = this.navParams.get("nameEn");
    this.monitorID = this.navParams.get("monitorID");
    if(this.nameEn === 'Group control'){
      this.isNotQunKong=false;
    }
    this.getCurtainInfo();

    if(this.isNotQunKong){
      this.fnID = 'state';
      let fnData = Variable.GetFnData(this.fnID);
      this.getDeviceState1(fnData);
      this.events.subscribe(`FnData:${this.fnID}`, this.eventsFn51Handler);
      Variable.socketObject.getFnData("13",this.monitorID);
    }

  }

  private eventsFn51Handler = (data: any) => {
    this.getDeviceState1(data);
  }
  /**end***/

  getDeviceState1(data: any) {
    if (data) {
      // this.state = data[this.id][0];
      if(!data[this.id]){ return ;}
      let type1Data = Number(data[this.id][0]);

      if (this.setInfo) {
        if (this.setInfo.type == "type1") {
          if (this.setInfo.value == type1Data) {
            if (type1Data >= 10) {
              this.state = type1Data;
              this.saturation = type1Data-10;
            } else {
              this.state = type1Data;
              this.saturation = 0;
            }
            this.dismissLoading();
          }
        }
      } else {
        if (type1Data >= 10) {
          this.state = type1Data;
          this.saturation = type1Data-10;
        } else {
          this.state = type1Data;
          this.saturation = 0;
        }

      }
    }
  }
  //获取窗帘设置和获取信息
  getCurtainInfo() {
    switch (this.nameEn) {
      case 'Sun canopy': {//遮阳顶棚
        this.curtainInfo = {
          openFnID: 37,
          openSetPipe: 16,
          timerSetFnID: 38,
          timerRoadID: 5,
          timerGetFnID: 13
        };
        break;
      }
      case 'East curtain': {//东帘
        this.curtainInfo = {
          openFnID: 37,
          openSetPipe: 1,
          timerSetFnID: 38,
          timerRoadID: 1,
          timerGetFnID: 13
        };
        break;
      }
      case 'South curtain':  {//南帘
        this.curtainInfo = {
          openFnID: 37,
          openSetPipe: 2,
          timerSetFnID: 38,
          timerRoadID: 2,
          timerGetFnID: 13
        };
        break;
      }
      case 'Western curtain': {//西帘
        this.curtainInfo = {
          openFnID: 37,
          openSetPipe: 4,
          timerSetFnID: 38,
          timerRoadID: 3,
          timerGetFnID: 13
        };
        break;
      }
      case 'North curtain': {//北
        this.curtainInfo = {
          openFnID: 37,
          openSetPipe: 8,
          timerSetFnID: 38,
          timerRoadID: 4,
          timerGetFnID: 13
        };
        break;
      }
      case 'illuminate': {//照明
        this.curtainInfo = {
          openFnID: 37,
          openSetPipe: 32,
          timerSetFnID: 38,
          timerRoadID: 6,
          timerGetFnID: 13
        };
        break;
      }
      case 'Group control':  {//群控
        this.curtainInfo = {
          openFnID: 37,
          openSetPipe: 0,
          timerSetFnID: 38,
          // timerRoadID: 1,
          // timerGetFnID: 25
        };
        break;
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
    this.setInfo = {
      type: 'type1',
      value: num,
    };
    this.state=num;
    let controData = `${this.curtainInfo.openSetPipe},${num}`;
    Variable.socketObject.sendMessage(this.monitorID, this.curtainInfo.openFnID, controData,this.isNotQunKong);

  }

  ionViewWillUnload() {
    this.events.unsubscribe(`FnData:${this.fnID}`, this.eventsFn51Handler);

  }


  rangeChange() {
    let setKaiduValue = this.saturation * 1 + 10;
    this.setInfo = {
      type: 'type1',
      value: setKaiduValue,
    };
    let controData = `${this.curtainInfo.openSetPipe},${setKaiduValue}`;
    Variable.socketObject.sendMessage(this.monitorID, this.curtainInfo.openFnID, controData, this.isNotQunKong);


  }
  presentShowModal() {
    let profileModal = this.modalCtrl.create('DeviceCurtainTimerPage', { name: this.name, curtainInfo: this.curtainInfo, monitorID: this.monitorID });
    profileModal.onDidDismiss(data => {
    });
    profileModal.present();
  }

  // setDeviceState(state: any) {
  //   this.state = state;
  //   Variable.socketObject.setDeviceStateAndMonitorID(this.id, this.name, state, this.monitorID);
  // }

}
