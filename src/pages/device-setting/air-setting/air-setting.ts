import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import * as ProgressBar from "progressbar.js";
import { Variable } from '../../../providers/model/variable';
import { DeviceRequestsProvider } from '../../../providers/tools/requests'
import { ToolsProvider } from '../../../providers/tools/tools'

/**
 * Generated class for the AirSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-air-setting',
  templateUrl: 'air-setting.html',
})
export class AirSettingPage {

  name: string;
  id: number;
  paramData: any = {};
  temp: number = 16;
  private tempMax: number = 30;
  private tempMin: number = 15;
  barCircleObj: any;
  modeKV: any = [];
  speedKV: any = [];
  tempKv: any = [];

  open: boolean;
  eco: boolean;
  // speed: number;
  airData: any = {};
  private monitorID: number;
  private deviceID: number;
  tempColumns: any = [];

  airParams: any;
  paramsData: any;
  roomTempData: any;
  // settingTempData: any;
  selectedMode: any = {};
  selectedSpped: any = {};
  openData: any;
  fnID: number;
  fnID3: number;
  airfFnID: string;
  airTimerfFnID: string;
  setInfo: any = { type: '', value: '' };
  airTypeParam: any = {};
  speedMode: boolean;
  keyboardLock: boolean;
  valve1: boolean;
  valve2: boolean;
  linkage: boolean;
  airSetInfo: object = {};
  timeoutObj: any;
  coolOffline: number;
  hotUpperLimit: number;
  timer1Open: boolean;
  timer2Open: boolean;
  timer3Open: boolean;
  timer4Open: boolean;
  tempTimeoutObj: any;



  constructor(public navCtrl: NavController, public navParams: NavParams,
    private modalCtrl: ModalController,
    private events: Events,
    private device: DeviceRequestsProvider,
    private tools: ToolsProvider) {

    this.id = this.navParams.get("id");
    this.name = this.navParams.get("name");
    this.paramData = this.navParams.get("data");
    // this.monitorID = this.paramData.F_MonitorID;
    this.deviceID = this.paramData.F_ID;


    this.getTempColumns();


  }

  getFnData() {
    let fnID = this.airfFnID;
    let fnData = Variable.GetFnData(fnID);
    this.getParamsFnData(fnData);
    this.events.subscribe(`FnData:${fnID}`, this.eventsFnAirHandler);

  }
  getFn3Data() {
    let fnID = this.airTimerfFnID;
    let fnData = Variable.GetFnData(fnID);
    this.getTimerFnData(fnData);
    this.events.subscribe(`FnData:${fnID}`, this.eventsFnAirTimerHandler);

  }
  getTimerFnData(data: any) {
    this.timer1Open = data['F31'] == '0' ? false : true;
    this.timer2Open = data['F313'] == '0' ? false : true;
    this.timer3Open = data['F325'] == '0' ? false : true;
    this.timer4Open = data['F337'] == '0' ? false : true;
  }
  getModeState(modeValue: string) {//获取模式状态
    this.modeKV.forEach(element => {
      if (element.F_paramsValue == modeValue) {
        this.selectedMode = element;
        if (this.eco) {
          if (element.F_Class == 'hot') {
            this.tempMax = this.hotUpperLimit;
            this.tempMin = 15;
          } else if (element.F_Class == 'cool') {
            this.tempMin = this.coolOffline;
            this.tempMax = 30;
          } else {
            this.tempMin = 15;
            this.tempMax = 30;
          }
        } else {
          this.tempMin = 15;
          this.tempMax = 30;
        }

        if (this.setInfo.type === 'mode') { if (element.F_ID == this.setInfo.value) { this.dismissLoading(); } }

      }
    });
  }
  getSpeedState(speed: string, speedMode: string) {//获取风速状态
    if (speedMode == '0') {
      this.speedMode = true;
      if (this.setInfo.type === 'speedMode') { this.dismissLoading(); }
      this.selectedSpped = {};
    } else {
      let temp = {};
      this.speedKV.forEach(element => {
        if (element.F_paramsValue == speed) {
          temp = element;
          this.speedMode = false;
        }
      });
      if (temp) {
        if (this.setInfo.type === 'speed') { if (temp["F_ID"] == this.setInfo.value) { this.dismissLoading(); } }

      }
      this.selectedSpped = temp;
    }
  }
  getParamsFnData(data: any) {
    let getInfo = this.airTypeParam.airGetInfo;
    let open = getInfo.open;
    let eco = getInfo.eco;
    let mode = getInfo.mode;
    let roomTemp = getInfo.roomTemp;
    let speed = getInfo.speed;
    let speedMode = getInfo.speedMode;
    let setTemp = getInfo.setTemp;
    let keyboardLock = getInfo.keyboardLock;
    let hotUpperLimit = getInfo.hotUpperLimit;
    let coolOffline = getInfo.coolOffline;

    this.hotUpperLimit = parseInt(data[hotUpperLimit]);
    this.coolOffline = parseInt(data[coolOffline]);

    this.linkage = this.tools.parseToBooleanByString(data[getInfo.linkage]);
    this.valve1 = this.tools.parseToBooleanByString(data[getInfo.value1]);
    this.valve2 = this.tools.parseToBooleanByString(data[getInfo.value2]);

    this.open = this.tools.parseToBooleanByString(data[open]);
    if (this.setInfo.type === 'open') { if (this.open == this.setInfo.value) { this.dismissLoading(); } }

    this.roomTempData = data[roomTemp];
    this.temp = data[setTemp];
    if (this.setInfo.type === 'setTemp') { if (this.temp == this.setInfo.value) { this.dismissLoading(); } }

    let modeValue = data[mode];
    this.getModeState(modeValue);//获取模式状态
    let speedModeValue = data[speedMode];
    let speedValue = data[speed];

    this.getSpeedState(speedValue, speedModeValue);//获取风速状态

    this.eco = this.tools.parseToBooleanByString(data[eco]);
    if (this.setInfo.type === 'eco') { if (this.eco == this.setInfo.value) { this.dismissLoading(); } }

    this.keyboardLock = this.tools.parseToBooleanByString(data[keyboardLock]);

    this.setCircleNum();
  }
  dismissLoading() {
    this.setInfo.type = '';
    this.setInfo.value = '';
    Variable.socketObject.dismissLoading();
    clearTimeout(this.timeoutObj);
  }
  checkSetInfo(type: string, value: any) {
    this.setInfo.type = type;
    this.setInfo.value = value;
    this.timeoutObj = setTimeout(() => {
      this.dismissLoading();
    }, 60000);
  }

  ionViewWillUnload() {
    // this.events.unsubscribe(`FnData:${this.fnID}`, this.eventsFn51Handler);
    this.events.unsubscribe(`FnData:${this.airfFnID}`, this.eventsFnAirHandler);
    this.events.unsubscribe(`FnData:${this.airTimerfFnID}`, this.eventsFnAirTimerHandler);
  }


  ionViewDidLoad() {
    this.setCircle();

    this.device.getAirTypeParams(this.deviceID, 'yssAir').then((res: any) => {
      console.log(res)
      this.airTypeParam = res;
      this.monitorID = res.MonitorID;
      this.fnID = res.FnID;
      this.airSetInfo = res.airSetInfo;
      if (res.airParam) {
        this.modeKV = res.airParam["mode"];
        this.speedKV = res.airParam['speed'];
      }
      this.airfFnID = this.tools.getMonitorFnID(res.FnID, res.MonitorID);
      this.getFnData();
      Variable.socketObject.getFnData(res.FnID, res.MonitorID);
      this.fnID3 = 3;
      this.airTimerfFnID = this.tools.getMonitorFnID(this.fnID3.toString(), res.MonitorID);
      this.getFn3Data();
      Variable.socketObject.getFnData(this.fnID3.toString(), res.MonitorID);

    });

  }


  private eventsFnAirHandler = (data: any) => {
    this.getParamsFnData(data);
  }

  private eventsFnAirTimerHandler = (data: any) => {
    this.getTimerFnData(data);
  }

  getTempColumns() {
    let t = [];
    for (let i = this.tempMin; i <= this.tempMax; i++) {
      t.push({ text: `${i}`, value: i });
    }
    this.tempColumns = [
      {
        options: t
      }];
  }

  private getTempNum(data: string) {
    let num: number = Number(data);
    return num;
  }
  setCircle() {
    this.barCircleObj = new ProgressBar.Circle(document.getElementById("circlebar"), {
      strokeWidth: 3,
      easing: 'easeInOut',
      duration: 500,
      color: '#52A1F3',
      trailColor: '#eee',
      trailWidth: 3,
      svgStyle: null,
      // boxShadow: '0 2px 6px 0 #4D95DF',
    });
    this.setCircleNum();
  }
  setCircleNum() {
    this.getTempColumns();
    let num = (this.temp * 1 - this.tempMin * 1) / (this.tempMax * 1 - this.tempMin * 1);
    this.barCircleObj.animate(num);



  }
  tempAdd() {
    this.temp = Number(this.temp);
    if (this.temp < this.tempMax) {
      this.temp++;
      this.setCircleNum();
      this.setTempoutTemp();
      // this.setAirTemp();
      // this.sendAir();

    }

  }
  setTempoutTemp() {
    if (this.tempTimeoutObj) {
      clearTimeout(this.tempTimeoutObj);
    }
    this.tempTimeoutObj = setTimeout(() => {
      this.setAirTemp();
    }, 500);
  }
  private setAirTemp() {
    Variable.socketObject.sendMessage(this.monitorID, this.airSetInfo['setTemp'], Number(this.temp))
    this.checkSetInfo('setTemp', this.temp);

  }
  tempSub() {
    this.temp = Number(this.temp);

    if (this.temp > this.tempMin) {
      this.temp--;
      this.setCircleNum();
      // this.setAirTemp();
      this.setTempoutTemp();
      // this.sendAir();
    }
  }
  changeTemp() {
    this.setCircleNum();
    this.setAirTemp();

  }
  modeChange() {
  }

  setOpen() {
    this.open = !this.open;

    Variable.socketObject.sendMessage(this.monitorID, this.airSetInfo['open'], this.open ? 1 : 0)
    this.checkSetInfo('open', this.open);
  }
  setEco() {
    this.eco = !this.eco;
    Variable.socketObject.sendMessage(this.monitorID, this.airSetInfo['eco'], this.eco ? 1 : 0)
    this.checkSetInfo('eco', this.eco);
  }
  setSpeed(data: any) {
    this.speedMode = false;
    this.selectedSpped = data;
    // this.setAir(data['F_Mode'], data['F_Code']);
    Variable.socketObject.sendMessage(this.monitorID, this.airSetInfo['speed'], data.F_paramsValue)
    this.checkSetInfo('speed', data.F_ID);


  }
  setSpeedMode() {
    this.selectedSpped = {};
    this.speedMode = true;
    // this.setAir(data['F_Mode'], data['F_Code']);
    Variable.socketObject.sendMessage(this.monitorID, this.airSetInfo['speed'], 0)
    this.checkSetInfo('speedMode', true);


  }

  setMode() {
    let modalObj = this.modalCtrl.create('AirSettingModePage', { Data: this.modeKV });
    modalObj.onDidDismiss(res => {
      if (res != null) {
        this.selectedMode = res;
        Variable.socketObject.sendMessage(this.monitorID, this.airSetInfo['mode'], res.F_paramsValue)
        this.checkSetInfo('mode', res.F_ID);
      }
    });
    modalObj.present();


  }

  setAir(mode: string, code: string) {
    let setID = this.airParams.F_SetID;

    let data = `${setID},${mode},${code}`;//42 主机标号 模式 参数


    Variable.socketObject.setAir(data, this.airParams.F_MonitorID, this.airParams.F_SetFnID);
  }
  // private eventsAirHandler = (data: any) => {
  //   this.airData = data;
  //   this.setDetailData();
  // }

  goMorePage() {
    this.navCtrl.push("AirSettingMorePage", { id: this.id, name: this.name, airTypeParam: this.airTypeParam, fnID: this.fnID, monitorID: this.monitorID });
  }
  presentShowModal(id: number, name: string) {
    let mode = this.airTypeParam.airParam.mode;
    let speed = this.airTypeParam.airParam.speed;
    let profileModal = this.modalCtrl.create('AirSettingTimerPage', { id: id, name: name, fnID: this.fnID3, mode: mode, speed: speed, monitorID: this.monitorID });
    profileModal.onDidDismiss(data => {
    });
    profileModal.present();
  }
}
