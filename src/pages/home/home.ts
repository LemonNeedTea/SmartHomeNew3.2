import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, LoadingController, ModalController, Events, Header, AlertController } from 'ionic-angular';
import { Variable } from '../../providers/model/variable';
import { DeviceRequestsProvider } from '../../providers/tools/requests'
// import { ModePublicSettingPage } from '../mode-public-setting/mode-public-setting';
// import { ModeSettingPage } from '../mode-setting/mode-setting';
import { ToolsProvider } from '../../providers/tools/tools';
import { SpeechHelperProvider } from '../../providers/tools/speechHelper';
import{ ConfigProvider } from '../../providers/config/config'
import { TranslateService } from "@ngx-translate/core";




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Header) header;

  @ViewChild("homeHeaderContent") homeHeaderContent;

  overview: any;
  workorder: any;
  modeID: number;
  modeDataList: any = [];
  weatherinfo: any = {};
  homeType: string = 'mode';
  power: string;
  oneData: any = { ud: 0, um: 0, uy: 0 };

  homeParams: any;
  energyParamsData: any = {};


  oldPowser: string;

  fnIDarr: Array<number> = [];
  envData: any = [];
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController, private modalCtrl: ModalController, private events: Events,
    private deviceRequest: DeviceRequestsProvider,
    private alertCtrl: AlertController,
    private tools: ToolsProvider,
    private speech: SpeechHelperProvider,
    public el: ElementRef,
    public config: ConfigProvider,
    public translate: TranslateService
  ) {
    this.deviceRequest.getWeatherInfo().then(res => {
      this.weatherinfo = res;
    });

    // this.deviceRequest.getMenuList('env').then((res: any) => {
    //   this.envData = res;
    // })


  }
  goEnv() {
    if (this.envData[0]) {
      this.navCtrl.push(this.envData[0].F_Url, { Data: this.envData[0] });
    }
  }
  scan() {
    this.speech.startSpeech();
  }

  getFnEnergyData(data: any, fnCode: string, bit: number, name: string) {
    let value = data[fnCode];
    if (data && value) {
      if (bit < 0) {
        this.energyParamsData[name] = value;
      } else {
        let arr = value.split(',');
        this.energyParamsData[name] = arr[bit];
      }

    }

  }
  fnDataSubscribe() {
    this.modeID = Variable.modeID;
    this.events.subscribe("FnData:modeID", (res) => {
      this.modeID = res;
    });
    // this.deviceRequest.getParamsInfoData('home').then((res: any) => {
    // this.homeParams = res;
    this.homeParams.forEach(element => {
      let fnID = element.F_FnID;
      let fnCode = element.F_Fncode;
      let bit = element.F_Bit;
      let type = element.F_Type;

      let fnData = Variable.GetFnData(fnID);
      this.getFnEnergyData(fnData, fnCode, bit, type);
      this.events.subscribe(`FnData:${element.F_FnID}`, (res) => {
        this.getFnEnergyData(res, fnCode, bit, type);
      });
    });
    // });
  }
  ionViewDidLeave() {
    // this.events.unsubscribe("FnData:51", () => { });
    // this.events.unsubscribe("FnData:50", () => { });
    // this.events.unsubscribe("FnData:54", () => { });

  }
  ionViewWillUnload() {

  }
  ionViewDidEnter() {
    // this.fnDataSubscribe();
  }

  ionViewDidLoad() {
    let headerHeight = this.header._elementRef.nativeElement.clientHeight;
    let height: number = Number(headerHeight) + 150;
    this.el.nativeElement.querySelector('.scroll-content').style.paddingTop = `${height}px`;

    // this.scan();
    this.loadListData().then(res => {
      this.fnDataSubscribe();
    });
  }
  loadListData() {
    return new Promise(reject => {
      // this.deviceRequest.getWeatherInfo().then(res => {
      //   this.weatherinfo = res;
      // });

      this.deviceRequest.getHomePageInfo().then(res => {
        this.envData = res['envData'];
        this.modeDataList = res['modeDataList'];
        this.homeParams = res['homeParams'];
        reject(true);
      });
      // this.deviceRequest.getDeviceMode().then(res => {
      //   this.modeDataList = res;
      //   reject(true);
      // }, err => { });
    })
  }
  goModePublicSetting() {
    this.navCtrl.push('ModePublicSettingPage');
  }
  goModeSetting(mode: any) {
    this.navCtrl.push('ModeSettingPage', { mode: mode });
  }
  setMode(mode: any) {
    this.tools.showAnimatePulse(this.el, `mode${mode.F_AgreementID}`);
    // this.tools.showAnimatePulse(`mode${id}`);

    let auto = Variable.isAuto;
    if (auto) {
      // alert("手动模式，不可控");
      // this.alertCtrl.create({
      //   title: '提示！',
      //   cssClass: "alarm",
      //   message:'手动模式，不可控！',
      //   buttons: ['OK']
      // }).present();
      if (this.config.chinese){
      this.tools.presentAlarmAlert("手动模式，不可控", "提示");
      }else{
        this.tools.presentAlarmAlert("Manual mode, uncontrollable", "tip");

      }
      return;
    }
   
    this.presentConfirm(this.config.chinese?mode.F_Name:mode.F_Name_En).then(res => {
      Variable.socketObject.setMode(mode);
    });
  }
  async presentConfirm(name: string) {
    let okText,cancelText;
    await this.translate.get("ok").subscribe(res => okText = res);
    await this.translate.get("cancel").subscribe(res => cancelText = res);
    return new Promise(resolve => {
      let alert = this.alertCtrl.create({
        title: okText,
        message: `${name}?`,
        buttons: [
          {
            text: cancelText,
            role: 'cancel',
            handler: () => {
            }
          },
          {
            text: okText,
            handler: () => {
              resolve(true);
            }
          }
        ]
      });
      alert.present();
    })

  }
  scrollEvent(e) {
    // if (e.scrollTop <= 100) {
    //   this.header._elementRef.nativeElement.style.backgroundColor = `rgba(82,161,243,0)`;;
    //   let opacity = e.scrollTop / 100;//设置滚动距离300的时候导航栏消失

    //   let color = `rgba(82,161,243,${opacity})`;
    //   this.homeHeaderContent.nativeElement.style.backgroundColor = color;

    // } else {
    //   this.header._elementRef.nativeElement.style.backgroundColor = `rgba(82,161,243,1)`;;

    // }

  }
  doRefresh(refresher) {
    this.loadListData().then(res => {
      refresher.complete();
    });
    setTimeout(() => {
      refresher.complete();
    }, 10000);
  }


}
