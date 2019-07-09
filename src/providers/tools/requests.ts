import { Injectable, ViewChild } from '@angular/core';

import { ToolsProvider } from '../tools/tools';
import { StorageProvider } from '../../providers/storage/storage';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { ToastController, Events, Nav } from 'ionic-angular'
import { ConfigProvider } from '../config/config';
import { EnumChartType } from '../model/enumdata';
import { SocketHelpProvider } from './socketHelper';
import { Variable } from '../../providers/model/variable';
import { resolve } from 'url';
import { Http } from '@angular/http'

@Injectable()
export class LoginRequestsProvider {
  @ViewChild(Nav) nav: Nav;

  socketObj: any;

  constructor(
    private tools: ToolsProvider,
    private http: HttpServicesProvider,
    private events: Events,
    private storage: StorageProvider,
    private config: ConfigProvider,
    private toastCtrl: ToastController,
    private socket: SocketHelpProvider,
    // private device:DeviceRequestsProvider,
    private http1: Http


  ) {
  }
  /**
* 登录
* @param 用户名  
* @param 密码 
*/
  login(username: string, password: string) {

    return new Promise((resolve, reject) => {

      this.tools.getRegistrationID().then(res => {
        let params = {
          'txtUser': username,
          'txtPwd': password,
          'AppKey': '0fe661ea30498c2cb8aadebd',
          'RegistrationId': res,
        };

        this.http.post("/EnergyAppLogin/LoginCheck", params).then(res => {
          if (res["State"] == true) {
            let userInfo = res["UserInfo"];
            userInfo['txtUser'] = username;
            userInfo['txtPwd'] = password;
            this.tools.setUserInfo(userInfo);
            this.events.publish('user:created', userInfo, Date.now());
            this.socket.startSocket();//启动websocket
            Variable.socketObject = this.socket;
            this.getTipAlarmList();
            //获取震动状态

            let vibrateState = this.tools.getVibrate();
            this.events.publish("vibrate", vibrateState);
            resolve(true);

          } else {
            let toast = this.toastCtrl.create({
              message: res["Msg"],
              duration: 3000,
              position: 'top'
            });
            toast.present();
            reject(false);
          }
        }, err => {
          reject(err);
        });
      })

    });

  }
  autoLogin() {
    return new Promise((resolve, reject) => {
      let userinfo = this.storage.get(this.config.userInfoSotrageName);
      if (userinfo == null) {
        reject();
      } else {

        let username = userinfo["txtUser"];
        let userpwd = userinfo["txtPwd"];
        this.login(username, userpwd).then(res => {
          resolve();
        }, err => {
          reject();
        });
      }
    });

  }
  removeUserInfo() {
    this.tools.getRegistrationID().then(res => {
      let params = {
        'RegistrationId': res,
      };
      this.http.post("/EnergyAppLogin/RemoveLogin", params).then(res => { });
    })

    this.storage.remove(this.config.userInfoSotrageName);//
    //移除FnData
    Variable.ClearAll();
    this.socket.closeSocket();
    this.clearClass(Variable);
    // this.socketObj.ws.close();
    // this.nav.setRoot(LoginPage);
  }

  private clearClass(data: any) {
    for (const key in data) {
      let element = data[key];
      if (element instanceof Function) {

      } else if (element instanceof Object) {
        data[key] = {};
      }
      else {
        data[key] = null;
      }
      // else if(element instanceof Object){
      //   element={};
      // }else if(element instanceof Boolean){
      //   element=null;
      // }else if(element instanceof Number){

      // }


    }
  }
  private getTipAlarmList() {
    this.http.postMain("/EnergyAppData/GetAlarmDataList", {}, false).then((res: any) => {
      // res.forEach(element => {
      //   if (element.F_LastState == 1 && element.F_IsTip == true) {
      //     this.tools.presentAlarmAlert(element.F_AlarmText);
      //   }
      // });
    });
  }
}

@Injectable()
export class DeviceRequestsProvider {
  constructor(
    private tools: ToolsProvider,
    private http: HttpServicesProvider
  ) {

  }
  /** 
* 获取设备模式列表
*/
  getDeviceMode() {
    return this.http.postMain('/EnergyAppData/GetDeviceModeDataList', {}, false);
  }
  /** 
* 获取设备列表
*/
  getDeviceDataList() {
    return this.http.postMain('/EnergyAppData/GetDevicesDataList');
  }
  getDeviceTypeDataList() {
    return this.http.postMain("/EnergyAppData/GetDeviceTypeDataList", {}, false);
  }

  getFloorDataList() {
    return this.http.postMain("/EnergyAppData/GetFloorDataList", {}, false);
  }
  getRoomDataList() {
    return this.http.postMain("/EnergyAppData/GetRoomDataList", {}, false);
  }
  getDeviceDataListByRoomID(roomID: string) {
    return this.http.postMain('/EnergyAppData/GetDevicesDataListByRoomID', { "RoomID": roomID });
  }
  getDeviceDataListByTypeID(typeID: string) {
    return this.http.postMain('/EnergyAppData/GetDevicesDataListByTypeID', { "TypeID": typeID });
  }
  getWaterlevelMapChartData(data: any) {

    let params = {
      MonitorID: data.MonitorID,
      SortIndex: data.ObjType,
      StartTime: data.StartTime,
      StopTime: data.StopTime,
      DateType: data.DateType,
      FnID: data.FnID
    };
    return this.http.postMain('/EnergyAppData/GetLineChartData', params);
  }
  getEnergyChartData(data: any) {
    let params = {
      MonitorID: data.MonitorID,
      SortIndex: data.ObjType,
      StartTime: data.StartTime,
      StopTime: data.StopTime,
      DateType: data.DateType,
      FnID: data.FnID
    };
    return this.http.postMain('/EnergyAppData/GetBarChartData', params);
  }
  getAlarmDataList(isLoading: boolean = true) {
    return this.http.postMain("/EnergyAppData/GetAlarmDataList", {}, isLoading);
  }
  getAlarmHistoryDataList(startTime: string, stopTime: string, alarmType: string) {
    let params = {
      StartTime: startTime,
      StopTime: stopTime,
      AlarmType: alarmType
    }
    return this.http.postMain("/EnergyAppData/GetAlarmHistoryDataList", params);
  }
  setAlarmState(id: string) {
    let result = this.http.postMain("/EnergyAppData/SetAlarmState", { ID: id }, false);
    return result;
  }
  getAlarmTypeDataList() {
    return this.http.postMain("/EnergyAppData/GetAlarmType", {}, false);
  }
  GetDeviceModeDetailDatas(modeID: string) {
    return this.http.postMain("/EnergyAppData/GetDeviceModeDetailDatas", { ModeID: modeID });
  }
  setModeDetail(mode: any, data: any) {
    let params = {
      'ModeID': mode.F_ID,
      'ModeName': mode.F_Name,
      'F_SecurityRun': mode.F_SecurityRun,
      'AgreementID': mode.F_AgreementID,
      'IsEdit': true,
      'Data': JSON.stringify(data)
    }
    return this.http.postMain("/EnergyAppData/SetModeDetail", params);
  }
  getWeatherInfo() {
    return new Promise(resolve => {

      let oldData = this.tools.storage.get("weather");
      let url = "https://free-api.heweather.com/s6/weather/now?parameters&location=auto_ip&key=bf803ac931bc48ac8249de2024199c64";
      this.http.get(url).then((res: any) => {
        var weatherInfo = res.HeWeather6[0];
        if (weatherInfo && weatherInfo.status == 'ok') {
          var weather = {
            temperature: weatherInfo.now.tmp,
            humidity: weatherInfo.now.hum,
            cond_txt: weatherInfo.now.cond_txt,
            wind_dir: weatherInfo.now.wind_dir,
            wind_sc: weatherInfo.now.wind_sc,
            location: weatherInfo.basic.location,
            pcpn: weatherInfo.now.pcpn,
            weatherCode: weatherInfo.now.cond_code
          };
          if (!isNaN(weather.wind_sc)) {
            weather.wind_sc = weather.wind_sc + "级";
          }
          let oldData = this.tools.storage.get("weather");
          this.tools.storage.set("weather", weather);
          resolve(weather);
        } else {
          if (oldData)
            resolve(oldData);
        };
      });
    });

  }
  checkPassword(pwd: string) {
    return new Promise(resolve => {
      let params = {
        'txtUser': this.tools.getUserName(),
        'txtPwd': pwd
      };
      this.http.post("/EnergyAppLogin/LoginCheck", params).then(res => {
        if (res["State"] == true) {
          resolve(true);
        } else {
          this.tools.presentToast(res["Msg"]);
        }
      });
    });

  }
  setNewPassword(pwd: string, newpwd: string) {
    return new Promise(resolve => {
      let params = {
        'txtUser': this.tools.getUserName(),
        'txtPwd': pwd,
        'txtPwdNew': newpwd
      }
      this.http.post("/EnergyAppLogin/PasswordSetting", params).then((res: any) => {
        if (res.Success) {
          resolve(true);
        } else {
          this.tools.presentToast("设置失败！");
        }
      }, err => {
        console.log(err);
      })
    });


  }
  getSpeechDataList(data: string) {
    return this.http.postMain("/EnergyAppData/GetSpeechDataList", { Data: data });
  }
  getDeviceIDtoTypeID() {
    return this.http.postMain("/EnergyAppData/GetDeviceIDtoTypeID");
  }
  getDeviceIDtoRoomaAndFloorID() {
    return this.http.postMain("/EnergyAppData/GetDeviceIDtoRoomaAndFloorID");
  }

  getEnergyInfoList(data: string) {
    return this.http.postMain("/EnergyAppData/GetEnergyInfoList", { Type: data }, false);
  }
  getEnergyType() {
    return this.http.postMain("/EnergyAppData/GetEnergyType", {}, false);
  }

  getMenuList(data: string) {
    return this.http.postMain("/EnergyAppData/GetMenuList", { Type: data }, false);
  }
  getEnergyQuery(data: number) {
    return this.http.postMain("/EnergyAppData/GetEnergyQuery", { ID: data }, false);
  }
  getDeviceGetInfoDataByID(data: number) {
    return this.http.postMain("/EnergyAppData/GetDeviceGetInfoDataByID", { ID: data });
  }
  getParamsInfoData(data: string) {
    return this.http.postMain("/EnergyAppData/GetParamsInfoData", { Type: data }, false);
  }
  getModeSettingDataList() {
    return this.http.postMain("/EnergyAppData/GetModeSettingDataList");
  }
  getAirDataByID(id: number) {
    return this.http.postMain("/EnergyAppData/GetAirDataByID", { ID: id });
  }
  getAirParamsDataList() {
    return this.http.postMain("/EnergyAppData/GetAirparamsDataList");
  }

}


