import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, LoadingController, ModalController, Events, Header, AlertController } from 'ionic-angular';
import { Variable } from '../../providers/model/variable';
import { DeviceRequestsProvider } from '../../providers/tools/requests'
// import { ModePublicSettingPage } from '../mode-public-setting/mode-public-setting';
// import { ModeSettingPage } from '../mode-setting/mode-setting';
import { ToolsProvider } from '../../providers/tools/tools';
import { SpeechHelperProvider } from '../../providers/tools/speechHelper'




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Header) header;

  @ViewChild("homeHeaderContent") homeHeaderContent;

  overview: any;
  workorder: any;
  modeID: string;
  modeDataList: any = [];
  weatherinfo: any = {};
  homeType: string = 'mode';
  power: string;
  oneData: any = { ud: 0, um: 0, uy: 0 };
  oldPowser: string;
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController, private modalCtrl: ModalController, private events: Events,
    private deviceRequest: DeviceRequestsProvider,
    private alertCtrl: AlertController,
    private tools: ToolsProvider,
    private speech: SpeechHelperProvider,
    public el: ElementRef
  ) {

    this.deviceRequest.getWeatherInfo().then(res => {
      // console.log(res);
      this.weatherinfo = res;
    });
  }
  scan() {
    this.speech.startSpeech();
  }
  getEnergyDataFn50(data: any) {
    if (data && data.F504) {
      this.power = data.F504;
      if (this.power != this.oldPowser) {
        this.oldPowser = this.power;
        this.tools.showAnimatePulse(this.el, 'power')
      }
    }
  }
  getEnergyDataFn54(data: any) {
    if (data && data.F541) {
      let f541Arr = data.F541.split(',');
      this.oneData = {
        ud: f541Arr[0],
        um: f541Arr[1],
        uy: f541Arr[2]
      };
    }

  }
  fnDataSubscribe() {
    // console.log("fnDataSubscribe");
    this.modeID = Variable.GetFnData('51', '-2');
    this.events.subscribe("FnData:51", (data) => {
      // console.log("home-fn51");
      if (data) {
        this.modeID = data['-2'];
      }
    });
    this.getEnergyDataFn50(Variable.GetFnData('50'));
    this.events.subscribe("FnData:50", (res) => {
      this.getEnergyDataFn50(res);
    });
    this.getEnergyDataFn50(Variable.GetFnData('54'));
    this.events.subscribe("FnData:54", (res) => {
      this.getEnergyDataFn54(res);
    });
  }
  ionViewDidLeave() {
    // console.log("ionViewWillLeave");
    // this.events.unsubscribe("FnData:51", () => { });
    // this.events.unsubscribe("FnData:50", () => { });
    // this.events.unsubscribe("FnData:54", () => { });

  }
  ionViewWillUnload() {
    // console.log("ionViewWillUnload");

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
      this.deviceRequest.getWeatherInfo().then(res => {
        this.weatherinfo = res;
      });
      this.deviceRequest.getDeviceMode().then(res => {
        this.modeDataList = res;
        reject(true);
      }, err => { });
    })
  }
  goModePublicSetting() {
    this.navCtrl.push('ModePublicSettingPage');
  }
  goModeSetting(mode: any) {
    this.navCtrl.push('ModeSettingPage', { mode: mode });
  }
  setMode(id: string, name: string) {
    this.tools.showAnimatePulse(this.el, `mode${id}`);
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
      this.tools.presentAlarmAlert("手动模式，不可控", "提示");
      return;
    }
    this.presentConfirm(name).then(res => {
      Variable.socketObject.setMode(id, name);
    });
  }
  presentConfirm(name: string) {
    return new Promise(resolve => {
      let alert = this.alertCtrl.create({
        title: '确认',
        message: `设为 ${name}?`,
        buttons: [
          {
            text: '取消',
            role: 'cancel',
            handler: () => {
            }
          },
          {
            text: '确认',
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
