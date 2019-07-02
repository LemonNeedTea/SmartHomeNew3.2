import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import * as ProgressBar from "progressbar.js";
import { Variable } from '../../../providers/model/variable';

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
  id: string;
  paramData: any = {};
  temp: number = 25;
  private tempMax: number;
  private tempMin: number;
  barCircleObj: any;
  modeColumns: any;
  speedColumns: any;
  sleepColumns: any;
  modeModel: number = 1;
  speedModel: number;
  sleepModel: number;
  modeKV: any = {};
  speedKV: any = {};
  spaceTemp: number;

  open: boolean;
  sleep: number;
  // speed: number;
  airData: any = {};
  private monitorID: number;
  private deviceID: number;
  tempColumns: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private modalCtrl: ModalController,
    private events: Events) {

    this.id = this.navParams.get("id");
    this.name = this.navParams.get("name");
    this.paramData = this.navParams.get("data");
    this.monitorID = this.paramData.F_MonitorID;
    this.deviceID = this.paramData.F_ID;




    // this.tempMax = 28;
    // this.tempMin = 16;
    this.modeKV = {
      0: { name: '冷风模式', url: "cool.png", class: 'selected' },
      1: { name: '暖风模式', url: "nuanfeng.png", class: 'hot' },
      2: { name: '地暖模式', url: "dinuan.png", class: 'hot' },
      3: { name: '暖风&地暖', url: "nuanfeng1.png", class: 'hot' },
      4: { name: '除湿模式', url: "chushi.png", class: 'selected' },
      5: { name: '通风模式', url: "songfeng.png", class: 'selected' },
    };
    this.speedKV = {
      0: '自动',
      1: '低速',
      2: '中速',
      3: '高速'
    };



  }
  ionViewDidLeave() {
    this.events.unsubscribe(`AirData:${this.monitorID}`, this.eventsAirHandler);
  }

  ionViewDidLoad() {

    this.setCircle();
    this.airData = Variable.GetAirData(this.monitorID + "");
    this.setDetailData();
    this.events.subscribe(`AirData:${this.monitorID}`, this.eventsAirHandler);

    Variable.socketObject.getAirData(this.monitorID);

  }
  setDetailData() {
    let data = this.airData;
    if (data.F6010) {

      this.tempMin = this.getTempNum(data.F6010) ;
      this.tempMax = this.getTempNum(data.F6011);
      this.temp = this.getTempNum(data.F602);
      this.spaceTemp = this.getTempNum(data.F6013);
      this.open = Boolean(Number(data.F601));
      this.modeModel = Number(data.F603);
      this.sleepModel = Number(data.F607);
      this.speedModel = Number(data.F608);
      let t = [];
      for (let i = this.tempMin; i <= this.tempMax; i += 0.5) {
        t.push({ text: `${i.toFixed(1)}`, value: i });
      }
      this.tempColumns = [
        {
          options: t
        }];
      console.log(this.tempColumns);
      // this.tempColumns = [
      //   {
      //     options: [
      //       { text: '8.0', value: 8 },
      //       { text: '1.0', value: 1 },
      //       { text: '风盘+地冷', value: 2 }
      //     ]
      //   }];
      this.setCircleNum();


      // this.setCircle(data.F6010, data.F6011);
    }
  }
  private getTempNum(data: string) {
    let num: number = Number(data);
    return num;
  }
  setCircle() {
    this.barCircleObj = new ProgressBar.Circle(document.getElementById("container"), {
      strokeWidth: 3,
      easing: 'easeInOut',
      duration: 500,
      color: '#52A1F3',
      trailColor: '#eee',
      trailWidth: 3,
      svgStyle: null,
      // boxShadow: '0 2px 6px 0 #4D95DF',
    });
  }
  setCircleNum() {
    // console.log('max:' + this.tempMax + "min:" + this.tempMin);
    let num = (this.temp - this.tempMin) / (this.tempMax - this.tempMin);
    this.barCircleObj.animate(num);

  }
  tempAdd() {
    this.temp = Number(this.temp);
    if (this.temp < this.tempMax) {
      this.temp += 0.5;
      this.setCircleNum();
      this.sendAir();

    }

  }
  private sendAir() {
    Variable.socketObject.setAir(`1,${Number(this.temp)}`, this.deviceID, this.monitorID);
  }
  tempSub() {
    this.temp = Number(this.temp);

    if (this.temp > this.tempMin) {
      this.temp -= 0.5;
      this.setCircleNum();
      this.sendAir();
    }
  }
  changeTemp() {
    this.setCircleNum();
    this.sendAir();

  }
  goMorePage() {
    this.navCtrl.push("AirSettingMorePage", { id: this.id, name: this.name });
  }
  modeChange() {
    console.log("modechange");
  }

  setOpen() {
    this.open = !this.open;
    Variable.socketObject.setAir(`0,${Number(this.open)}`, this.deviceID, this.monitorID);
  }
  setSpeed(data: number) {
    // this.speed = data;
    this.speedModel = data;
    Variable.socketObject.setAir(`7,${Number(this.speedModel)}`, this.deviceID, this.monitorID);

  }
  setSleep() {
    if (this.sleep > 0) {
      this.sleep = 0;
    } else {
      this.sleep = 1;
    }
  }
  setMode() {
    let modalObj = this.modalCtrl.create('AirSettingModePage');
    modalObj.onDidDismiss(res => {
      if (res != null) {
        this.modeModel = res;
        Variable.socketObject.setAir(`2,${Number(this.modeModel)}`, this.deviceID, this.monitorID);

      }
    });
    modalObj.present();


  }
  private eventsAirHandler = (data: any) => {
    this.airData = data;
    this.setDetailData();
    console.log(this.airData);
  }

}
