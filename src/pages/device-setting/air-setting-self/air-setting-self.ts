import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import * as ProgressBar from "progressbar.js";
import { Variable } from '../../../providers/model/variable';
import { DeviceRequestsProvider } from '../../../providers/tools/requests'
import { ToolsProvider } from '../../../providers/tools/tools'
import { ThrowStmt } from '@angular/compiler';

/**
 * Generated class for the AirSettingSelfPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-air-setting-self',
  templateUrl: 'air-setting-self.html',
})
export class AirSettingSelfPage {

  name: string;
  id: number;
  paramData: any = {};
  temp: number = 16;
  private tempMax: number = 30;
  private tempMin: number = 0;
  barCircleObj: any;
  modeKV: any = [];
  speedKV: any = [];
  tempKv: any = [];

  open: boolean;
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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private modalCtrl: ModalController,
    private events: Events,
    private device: DeviceRequestsProvider,
    private tools: ToolsProvider) {

    this.id = this.navParams.get("id");
    this.name = this.navParams.get("name");
    this.paramData = this.navParams.get("data");
    this.monitorID = this.paramData.F_MonitorID;
    this.deviceID = this.paramData.F_ID;

    this.getTempColumns();


  }
  getFnData(fnID: number) {
    let fnData = Variable.GetFnData(fnID + "");
    this.getParamsFnData(fnData);
    this.events.subscribe(`FnData:${fnID}`, res => {
      this.getParamsFnData(res);
    });

  }
  getParamsFnData(data: any) {

    let code = this.airParams.F_ParamsFnCode;
    let code1 = this.airParams.F_RoomTempFnCode;
    let code2 = this.airParams.F_SettingTempFnCode;

    this.paramsData = data[code] ? data[code] : 0;
    console.table(this.paramsData);
    this.roomTempData = data[code1] ? data[code1] : 0;
    this.temp = data[code2] ? Number(data[code2]) : this.tempMin;

    this.paramsData = 33928;
    let str = this.tools.numTo15BitArr(this.paramsData);
    let open = str[this.openData.F_Bit];
    this.open = Boolean(open);
    str.forEach((value, index) => {

      if (value == 1) {

        //是否是开关
        let find = false;
        this.modeKV.forEach(element => {
          if (element.F_Bit == index) {
            this.selectedMode = element;
            find = true;
          }
        });
        if (find == false) {
          this.speedKV.forEach(element => {
            if (element.F_Bit == index) {
              this.selectedSpped = element;
            }
          });
        }

      }
    });

    this.setCircleNum();
  }

  ionViewDidLeave() {
    // this.events.unsubscribe(`AirData:${this.monitorID}`, this.eventsAirHandler);
  }

  ionViewDidLoad() {
    this.setCircle();

    this.device.getAirDataByID(this.id).then(res => {
      this.airParams = res;

    });
    this.device.getAirParamsDataList().then(res => {
      this.modeKV = res['mode'];
      this.speedKV = res['speed'];
      this.tempKv = res['temp'];
      this.device.getDeviceGetInfoDataByID(this.id).then((getInfo: any) => {
        this.openData = getInfo;
        this.getFnData(this.airParams["F_FnID"]);

      });
    });

  }
  getTempColumns() {
    let t = [];
    for (let i = this.tempMin; i <= this.tempMax; i += 0.5) {
      t.push({ text: `${i.toFixed(1)}`, value: i });
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
    let num = (this.temp - this.tempMin) / (this.tempMax - this.tempMin);
    this.barCircleObj.animate(num);

  }
  tempAdd() {
    this.temp = Number(this.temp);
    if (this.temp < this.tempMax) {
      this.temp += 0.5;
      this.setCircleNum();
      this.setAirTemp();
      // this.sendAir();

    }

  }
  private setAirTemp() {
    this.setAir(this.tempKv[0]['F_Mode'], Number(this.temp) + "");

  }
  tempSub() {
    this.temp = Number(this.temp);

    if (this.temp > this.tempMin) {
      this.temp -= 0.5;
      this.setCircleNum();
      this.setAirTemp();
      // this.sendAir();
    }
  }
  changeTemp() {
    this.setCircleNum();
    this.setAirTemp();

  }
  modeChange() {
    console.log("modechange");
  }

  setOpen() {
    this.open = !this.open;
    Variable.socketObject.setAir(`0,${Number(this.open)}`, this.deviceID, this.monitorID);
  }
  setSpeed(data: any) {
    // this.speed = data;
    this.selectedSpped = data;
    this.setAir(data['F_Mode'], data['F_Code']);

  }

  setMode() {
    let modalObj = this.modalCtrl.create('AirSettingModePage', { Data: this.modeKV });
    modalObj.onDidDismiss(res => {
      if (res != null) {
        this.selectedMode = res;
        this.setAir(res['F_Mode'], res['F_Code']);

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
  //   console.log(this.airData);
  // }

}

