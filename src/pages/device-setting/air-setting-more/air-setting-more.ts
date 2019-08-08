import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { ToolsProvider } from '../../../providers/tools/tools'
import { Variable } from '../../../providers/model/variable';

/**
 * Generated class for the AirSettingMorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-air-setting-more',
  templateUrl: 'air-setting-more.html',
})
export class AirSettingMorePage {
  name: string;
  id: string;
  hotPumpModeColumns: any;
  hotColumns: any;
  coolColumns: any;
  hotPumpModel: number;
  coolModel: number;
  hotModel: number;
  tempMin: number = 15;
  tempMax: number = 30;
  tempColumns: any = [];
  backLightColumns: any = [];
  airTypeParam: object = {};
  airfFnID: string;
  fnID: string;
  monitorID: string;
  setInfo: any = { type: '', value: '' };
  speedMode: boolean;
  keyboardLock: boolean;
  valve1: boolean;
  valve2: boolean;
  linkage: boolean;
  airSetInfo: object = {};
  timeoutObj: any;
  coolOffline: number;
  hotUpperLimit: number;
  open: boolean;
  backlightDelay: number;
  tempDeviation: number;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private tools: ToolsProvider,
    private events: Events,
    private alertCtrl: AlertController) {
    this.name = this.navParams.get("name");
    this.id = this.navParams.get("id");
    this.airTypeParam = this.navParams.get("airTypeParam");
    this.airSetInfo = this.airTypeParam["airSetInfo"];
    this.fnID = this.navParams.get("fnID");
    this.monitorID = this.navParams.get("monitorID");
    this.getTempColumns();
    this.getBackLightColumns();

    this.airfFnID = this.tools.getMonitorFnID(this.fnID, this.monitorID);
    this.getFnData();
  }

  ionViewDidLoad() {
  }
  getTempColumns() {
    let t = [];
    for (let i = this.tempMin; i <= this.tempMax; i++) {
      t.push({ text: `${i}℃`, value: i });
    }
    this.tempColumns = [
      {
        options: t
      }];
  }
  getBackLightColumns() {
    let t = [];
    for (let i = 0; i <= 200;) {
      // let text: string = i.toString();
      // let value = i;
      // if (i = 0) {
      //   // text = '常亮';
      // }
      let text;
      if (i >= 60) {
        let m: number = Math.trunc(i / 60);
        let s: number = i % 60;
        text = `${m}分${s}秒`;
        i += 10;
      } else {
        text = i + "秒";
        i += 5;
      }
      t.push({ text: `${text}`, value: i });
    }
    this.backLightColumns = [
      {
        options: t
      }];
  }
  getFnData() {
    let fnID = this.airfFnID;
    let fnData = Variable.GetFnData(fnID);
    this.getParamsFnData(fnData);
    this.events.subscribe(`FnData:${fnID}`, this.eventsFnAirHandler);

  }
  ionViewWillUnload() {
    // this.events.unsubscribe(`FnData:${this.fnID}`, this.eventsFn51Handler);
    this.events.unsubscribe(`FnData:${this.airfFnID}`, this.eventsFnAirHandler);
  }
  private eventsFnAirHandler = (data: any) => {
    this.getParamsFnData(data);
  }
  getParamsFnData(data: any) {
    let getInfo = this.airTypeParam["airGetInfo"];
    let open = getInfo.open;
    let keyboardLock = getInfo.keyboardLock;
    let hotUpperLimit = getInfo.hotUpperLimit;
    let coolOffline = getInfo.coolOffline;

    this.hotUpperLimit = parseInt(data[hotUpperLimit]);
    if (this.setInfo.type === 'hotUpperLimit') { if (this.hotUpperLimit == this.setInfo.value) { this.dismissLoading(); } }
    this.coolOffline = parseInt(data[coolOffline]);
    if (this.setInfo.type === 'coolOffline') { if (this.coolOffline == this.setInfo.value) { this.dismissLoading(); } }

    this.linkage = this.tools.parseToBooleanByString(data[getInfo.linkage]);
    this.valve1 = this.tools.parseToBooleanByString(data[getInfo.value1]);
    if (this.setInfo.type === 'valve1') { if (this.valve1 == this.setInfo.value) { this.dismissLoading(); } }
    this.valve2 = this.tools.parseToBooleanByString(data[getInfo.value2]);
    if (this.setInfo.type === 'valve2') { if (this.valve2 == this.setInfo.value) { this.dismissLoading(); } }
    this.backlightDelay = data[getInfo.backlightDelay];
    if (this.setInfo.type === 'backlightDelay') { if (this.backlightDelay == this.setInfo.value) { this.dismissLoading(); } }

    this.tempDeviation = Number(data[getInfo.tempDeviation]);
    if (this.setInfo.type === 'tempDeviation') { if (this.tempDeviation == this.setInfo.value) { this.dismissLoading(); } }


    this.open = this.tools.parseToBooleanByString(data[open]);


    this.keyboardLock = this.tools.parseToBooleanByString(data[keyboardLock]);

    if (this.setInfo.type === 'keyboardLock') { if (this.keyboardLock == this.setInfo.value) { this.dismissLoading(); } }

    console.log(data);
  }
  presentPrompt(value: any) {
    let alert = this.alertCtrl.create({
      title: '温度偏移',
      inputs: [
        {
          name: 'pianyi',
          placeholder: '偏移量',
          value: value,
          type: 'number'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '设置',
          handler: data => {
            let reg = /\w/;
            if (reg.test(data.pianyi)) {
              if (data.pianyi >= -9.9 && data.pianyi <= 9.9) {
                this.tempDeviation = data.pianyi;
                this.setTempDeviation();
              } else {
                this.tools.presentToast("范围-9.9～9.9");
                return false;
              }
            } else {
              this.tools.presentToast("值不能为空！");
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }

  presentAddress() {
    let alert = this.alertCtrl.create({
      title: '服务器地址',
      inputs: [
        {
          name: 'ip',
          placeholder: 'IP地址',
          value: '0.0.0.0',
        },
        {
          name: 'port',
          placeholder: '端口',
          value: '0',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '设置',
          handler: data => {
            let reg = /(\w.\w.\w.\w)?/;
            if (reg.test(data.ip)) {
              data.ip = data.ip.match(reg);
              let arr: Array<number> = data.ip.match(/\w/gi);
              arr.forEach(element => {
                if (element >= 0 && element <= 255) {
                  //执行成功
                  console.log("执行成功");
                } else {
                  this.tools.presentToast("地址范围0～255");
                  return false;

                }
              });
            } else {
              this.tools.presentToast("IP格式不正确！");
              return false;
            }
            // if (User.isValid(data.username, data.password)) {
            //   // logged in!
            // } else {
            //   // invalid login
            //   return false;
            // }
          }
        }
      ]
    });
    alert.present();
  }
  setKeyboardLock() {

    Variable.socketObject.sendMessage(this.monitorID, this.airSetInfo['keyboardLock'], Number(this.keyboardLock))
    this.checkSetInfo('keyboardLock', this.keyboardLock);
  }
  setvalue1() {

    Variable.socketObject.sendMessage(this.monitorID, this.airSetInfo['value1'], Number(this.valve1))
    this.checkSetInfo('valve1', this.valve1);
  }
  setvalue2() {

    Variable.socketObject.sendMessage(this.monitorID, this.airSetInfo['value2'], Number(this.valve2))
    this.checkSetInfo('valve2', this.valve2);
  }
  sethotUpperLimit() {

    Variable.socketObject.sendMessage(this.monitorID, this.airSetInfo['hotUpperLimit'], this.hotUpperLimit)
    this.checkSetInfo('hotUpperLimit', this.hotUpperLimit);
  }
  setcoolOffline() {

    Variable.socketObject.sendMessage(this.monitorID, this.airSetInfo['coolOffline'], this.coolOffline)
    this.checkSetInfo('coolOffline', this.coolOffline);
  }
  setBacklightDelay() {
    Variable.socketObject.sendMessage(this.monitorID, this.airSetInfo['backlightDelay'], this.backlightDelay)
    this.checkSetInfo('backlightDelay', this.backlightDelay);
  }
  setTempDeviation() {
    Variable.socketObject.sendMessage(this.monitorID, this.airSetInfo['tempDeviation'], this.tempDeviation * 10)
    this.checkSetInfo('tempDeviation', this.tempDeviation);
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
}
