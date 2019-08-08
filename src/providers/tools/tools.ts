import { Injectable } from '@angular/core';
//配置文件
import { StorageProvider } from '../../providers/storage/storage';
import { Events, ToastController, AlertController } from 'ionic-angular';
import { ConfigProvider } from '../config/config';

import Moment, { now } from 'moment';
import { EnumEnergyType, EnumDateType, EnumChartType } from '../../providers/model/enumdata';
import { Vibration } from '@ionic-native/vibration';
import { JPush } from '@jiguang-ionic/jpush';
import { stringify } from 'querystring';


@Injectable()
export class ToolsProvider {

  constructor(
    public storage: StorageProvider,
    private events: Events,
    private config: ConfigProvider,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private vibration: Vibration,
    private jpush: JPush,
  ) {
  }
  //获取用户信息
  getUserName() {
    var userinfo = this.storage.get(this.config.userInfoSotrageName);
    if (userinfo && userinfo['username']) {
      return userinfo['username'];
    } else {
      return '';
    }
  }
  setUserInfo(data) {
    this.storage.set(this.config.userInfoSotrageName, data);
  }
  getRegistrationID() {
    return new Promise((resolve) => {
      var registrationid = this.storage.get("smarthomenew-registrationid");
      if (registrationid) {
        resolve(registrationid);
      } else {
        this.jpush.getRegistrationID().then(res => {
          this.storage.set("smarthomenew-registrationid", res);
          resolve(res);
        }, err => {
          resolve("");
        });
      }
    });
  }


  getNowDateStr(type?: EnumDateType) {
    let now = Moment();
    if (type == null) return now.format('YYYY-MM-DD HH:mm:ss');
    let result: string = '';
    switch (type) {
      case EnumDateType.Year: {
        result = now.format("YYYY"); break;
      }
      case EnumDateType.Month: {
        result = now.format('YYYY-MM');; break;
      }
      case EnumDateType.Day: {
        result = now.format('YYYY-MM-DD'); break;
      }
      case EnumDateType.Hour: {
        result = now.format('YYYY-MM-DD HH:mm'); break;
      }
    }
    return result;
  }
  getFullDateStr(dateStr: string, type?: EnumDateType) {
    if (type == null) return dateStr;
    let result: string = '';
    switch (type) {
      case EnumDateType.Year: {
        result = dateStr + '-01-01 00:00:00'; break;
      }
      case EnumDateType.Month: {
        result = dateStr + '-01 00:00:00'; break;
      }
      case EnumDateType.Day: case EnumDateType.Hour: {
        result = dateStr + ' 00:00:00'; break;
      }
    }
    let temp = Moment(result);
    let now = Moment();
    if (temp > now) {
      return now.format('YYYY-MM-DD HH:mm:ss');
    } else {
      return result;
    }
  }
  getAddDate(dateStr: string, type: EnumDateType) {
    let fullDateStr = this.getFullDateStr(dateStr, type);
    let fulDate = Moment(fullDateStr);
    let addDate;
    let result: string = '';
    switch (type) {
      case EnumDateType.Year: {
        addDate = fulDate.add(1, 'y'); break;
      }
      case EnumDateType.Month: {
        addDate = fulDate.add(1, 'M'); break;
      }
      case EnumDateType.Day: case EnumDateType.Hour: {
        addDate = fulDate.add(1, 'd'); break;
      }
    }
    let now = Moment();
    if (addDate > now) {
      return now.format('YYYY-MM-DD HH:mm:ss');
    } else {
      return addDate.format('YYYY-MM-DD HH:mm:ss')
    }
  }
  getYearAllRange() {
    let result: any = {};
    let now = Moment();
    let startYear: number = now.year() - 3;
    let stopYear: number = now.year();
    result.StartTime = startYear;
    result.StopTime = stopYear;
    result.DateType = EnumDateType.Year;
    return result;
  }
  getYearRange(year?: string) {
    let result: any = {};
    if (year == null) {
      let now = Moment();
      let startYear: number = now.year();
      result.StartTime = startYear + '-01';
      result.StopTime = now.format('YYYY-MM');
    } else {
      result.StartTime = year + '-01';
      result.StopTime = year + '-12';
    }
    result.DateType = EnumDateType.Month;
    return result;
  }
  getMonthRange(year?: string) {
    let result: any = {};
    if (year == null) {
      let now = Moment();
      result.StartTime = now.format('YYYY-MM') + '-01';
      result.StopTime = now.format('YYYY-MM-DD');
    } else {
      let temp = this.getFullDateStr(year, EnumDateType.Month);
      let tempDate = Moment(temp);
      result.StartTime = tempDate.startOf('month').format("YYYY-MM-DD");
      result.StopTime = tempDate.endOf('month').format("YYYY-MM-DD");

    }

    result.DateType = EnumDateType.Day;
    return result;
  }
  getNowDay() {
    let result: any = {};
    let now = Moment();
    result.StartTime = now.format('YYYY-MM-DD');
    result.StopTime = now.add(1, 'd').format('YYYY-MM-DD');
    result.DateType = 'day';

    return result;
  }
  getDayRange(day?: string) {
    let result: any = {};
    if (day == null) {
      let now = Moment();
      result.StartTime = now.format('YYYY-MM-DD');
      result.StopTime = now.format('YYYY-MM-DD');
    } else {
      let temp = this.getFullDateStr(day, EnumDateType.Day);
      // let tempDate = Moment(temp);
      result.StartTime = day;
      result.StopTime = day;

    }
    result.DateType = EnumDateType.Hour;
    return result;
  }
  parseToBooleanByString(data: string): boolean {
    if (parseInt(data)) {
      let n = parseInt(data);
      if (n = 0) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
  presentToast(data: string) {
    let toast = this.toastCtrl.create({
      message: data,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  getTimeStrByMin(min: number) {
    if (min) {
      let hour = Math.floor(min / 60);
      let minute = min % 60;
      return this.getTime(hour.toString(), minute.toString());
    } else {
      return this.getTime("0", "0");
    }

  }
  /**
   * 将小时、分钟转换成字符串 00:00
   * @param hour 
   * @param minute 
   */
  getTime(hour: string, minute: string) {
    let str = `${hour ? hour : 0}: ${minute ? minute : 0}`
    return Moment(str, "HH:mm").format("HH:mm");
  }
  /**
   * 将 00:00字符串 转换成分钟
   * @param timeStr 
   */
  getMinuteByTime(timeStr: string) {
    let time = Moment(timeStr, "HH:mm");
    let hour = time.hours();
    let minute = time.minutes();
    return hour * 60 + minute;
  }
  getSendControl(data: any, strLength = 18) {
    let num = 0;
    let arr = new Array();
    for (const item in data) {
      let temp = data[item];
      if (temp instanceof Array) {
        temp.forEach(ele => {
          arr.push(ele);
        });
      }
      else {
        if (!Number(temp)) {
          temp = 0;
        }
        arr.push(temp);
      }
    }
    let addNum = strLength - arr.length;
    while (addNum-- > 0) {
      arr.push(0);
    }
    return arr.join(',');

  }
  getArrayByFnData(fnData: any, fnID: string, startID: number, num: number): Array<any> {
    let result = [];
    for (let i = 0; i < num; i++) {
      let data = fnData[`F${fnID}${startID + i}`];
      result.push(data);
    }
    return result;
  }
  getArrayByOneFnData(fnData: any, fnID: string, startID: number): Array<any> {
    let result = [];
    let data: number = fnData[`F${fnID}${startID}`];
    if (data) {
      let temp = this.convertToBinary(data);
      result[0] = temp[0].toString();
      result[1] = temp[6].toString();
      result[2] = temp[5].toString();
      result[3] = temp[4].toString();
      result[4] = temp[3].toString();
      result[5] = temp[2].toString();
      result[6] = temp[1].toString();
    }
    // result.push(data);

    return result;
  }
  getNumberByArr(data: any) {
    let result: number = 0;
    if (!data) return result;
    let temp = [];
    temp[0] = data[0];
    temp[1] = data[6];
    temp[2] = data[5];
    temp[3] = data[4];
    temp[4] = data[3];
    temp[5] = data[2];
    temp[6] = data[1];
    let length = temp.length;
    for (let index = 0; index < length; index++) {
      const element = temp[index];
      if (element >= 1) {
        result += Math.pow(2, length - 1 - index);
      }

    }
    return result;
  }
  private convertToBinary(num) {
    var result = []
    while (num != 0) {
      result.push(num % 2)
      num = Math.floor(num / 2)
    }
    result.reverse()
    while (result.length < 7) {
      result.unshift(0)
    }
    return result;
  }
  presentAlarmAlert(data: string, title?: string) {
    let alert = this.alertCtrl.create({
      title: title ? title : `报警信息<img />`,
      // subTitle: ,
      cssClass: "alarm",
      message: `
      <div class='message'>${data}</div>`,
      buttons: ['关闭']
    });
    alert.present();
  }
  vibrate() {
    let state = this.getVibrate();
    if (state == true) {
      this.vibration.vibrate(1000);
    }
  }
  setVibrate(state: boolean) {
    this.storage.set("vibrate", state);
    this.vibrate();
  }
  getVibrate() {
    let data = this.storage.get("vibrate");
    if (data == null) {
      return true;
    } else {
      return data;
    }
  }
  showAnimatePulse(el: any, eleName: string, showbc: boolean = false) {
    return new Promise((resolve) => {
      let temp = el.nativeElement.querySelector(`.${eleName}`);
      if (showbc) {
        temp.style.background = "#eee";
      }
      temp.classList.add('animated', 'pulse');
      temp.addEventListener('animationend', () => {
        temp.classList.remove('animated', 'pulse');
        if (showbc) {
          temp.style.background = "";
        }

        resolve(true);
      });
    });

  }
  showAnimate(el: any, eleName: string, animateName: string) {
    let temp = el.nativeElement.querySelector(`.${eleName}`);
    temp.classList.add('animated', animateName);
    temp.addEventListener('animationend', () => {
      temp.classList.remove('animated', animateName);
    });
  }
  padStart(data: string, num: number, str: string): string {
    if (data.length >= num) return data;
    let num1 = num - data.length;
    let addStr = '';
    for (let i = 0; i < num1; i++) {
      addStr += '0';
    }
    return addStr += data;
  }
  numTo15BitArr(num: number): Array<any> {
    let result: Array<any> = [];
    let existLength = 0;
    if (num != null) {
      let n = parseInt(num.toString());

      let num16 = this.padStart(n.toString(16), 4, '0');
      let reg = /\w{2}/gi;
      let arr = num16.match(reg);
      let one = arr[1];
      let two = arr[0];

      let reg1 = /\w{1}/gi;
      let oneArr = this.padStart(parseInt(two, 16).toString(2), 8, '0').match(reg1);
      let twoArr = this.padStart(parseInt(one, 16).toString(2), 8, '0').match(reg1);

      result = [...oneArr, ...twoArr];


      //   let str = n.toString(2);



      //   for (let i = 0; i < str.length; i++) {
      //     result.push(Number(str[str.length - i - 1]));
      //   }
      // }
      // for (let i = 0; i < 15 - result.length; i++) {
      //   result.push(0);
      // }
      result = result.reverse();
    }
    return result;
  }
  getMonitorFnID(fnID: string, monitorID: string): string {
    let result = "";
    if (monitorID == "1") {
      return result + fnID;
    } else {
      return result + `${fnID};MonitorID:${monitorID}`

    }
  }





}
