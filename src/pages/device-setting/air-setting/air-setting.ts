import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as ProgressBar from "progressbar.js";

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
  modeModel: number;
  speedModel: number;
  sleepModel: number;
  modeKV: any = {};
  speedKV: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.id = this.navParams.get("id");
    this.name = this.navParams.get("name");
    this.paramData = this.navParams.get("data");
    this.tempMax = 28;
    this.tempMin = 16;
    this.modeKV = {
      0: '冷风模式',
      1: '暖风模式',
      2: '暖风+地暖',
      3: '除湿模式',
      4: '通风模式',
    };
    this.speedKV = {
      0: '自动',
      1: '低速',
      2: '中速',
      3: '高速'
    };

    this.modeColumns = [
      {
        options: [
          { text: '冷风', value: 0 },
          { text: '暖风', value: 1 },
          { text: '暖风+地暖', value: 2 },
          { text: '除湿', value: 3 },
          { text: '通风', value: 4 }
        ]
      }];
    this.speedColumns = [
      {
        options: [
          { text: '自动', value: 0 },
          { text: '低速', value: 1 },
          { text: '中速', value: 2 },
          { text: '高速', value: 3 }
        ]
      }];
    this.sleepColumns = [
      {
        options: [
          { text: '无睡眠', value: 0 },
          { text: '晚睡', value: 1 },
          { text: '午睡', value: 2 }
        ]
      }];
  }

  ionViewDidLoad() {

    this.setCircle();

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
      boxShadow: '0 2px 6px 0 #4D95DF'
    });

    this.setCircleNum();
  }
  setCircleNum() {
    let num = (this.temp - this.tempMin) / (this.tempMax - this.tempMin);
    this.barCircleObj.animate(num);
  }
  tempAdd() {
    if (this.temp < this.tempMax) {
      this.temp++;
      this.setCircleNum();
    }

  }
  tempSub() {
    if (this.temp > this.tempMin) {
      this.temp--;
      this.setCircleNum();
    }
  }
  goMorePage() {
    this.navCtrl.push("AirSettingMorePage", { id: this.id, name: this.name });
  }
  modeChange(){
  console.log("modechange");
  }

}
