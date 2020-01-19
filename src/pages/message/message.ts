import { Component, ElementRef } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { HttpServicesProvider } from "../../providers/http-services/http-services";
import { DeviceRequestsProvider } from '../../providers/tools/requests';
import { PopoverController, AlertController } from 'ionic-angular';
// import { WellpumpqueryPage } from '../wellpumpquery/wellpumpquery';
// import { PopoverPage } from '../popover/popover';
import { EnumChartType } from '../../providers/model/enumdata';
import { ToolsProvider } from '../../providers/tools/tools';
import { TranslateService } from "@ngx-translate/core";




@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class MessagePage {
  messagelists: any;
  typeDataList: any = [];
  constructor(public navCtrl: NavController, private http: HttpServicesProvider,
    private device: DeviceRequestsProvider,
    private popoverCtrl: PopoverController,
    private tools: ToolsProvider,
    private events: Events,
    public el: ElementRef,
    public alertCtrl: AlertController,
    public translate: TranslateService) {
    this.events.subscribe("data:messageList", res => {
      this.messagelists = res;
    })

  }

  loadDataList() {
    this.device.getAlarmDataList().then((res: any) => {
      this.messagelists = res;
      this.events.publish("FnData:MessageNum", res.length)
    });
  }
  ionViewDidEnter() {
    this.loadDataList();
    this.getAlarmTypeDataList();
  }
  setState(id: string) {
    this.device.setAlarmState(id).then(res => {
      if (res) {
        // this.tools.showAnimatePulse(this.el, `message${id}`);
        this.loadDataList();
      }
    })
  }
  getAlarmTypeDataList() {
    this.device.getAlarmTypeDataList().then(res => {
      this.typeDataList = res;
    });
  }
  showPopover(myEvent) {
    let popoverList = [];
    this.typeDataList.forEach(element => {
      popoverList.push({
        F_MenuName: element.F_Name,
        F_MenuName_En: element.F_Name_En,
        F_Url: 'WellpumpqueryPage',
        type: EnumChartType.Message,
        data: element
      });
    });

    //   { name: '用电量查询', page: EnergyQueryPage, type: EnumChartType.Ele },
    //   { name: '电负荷查询', page: WellpumpqueryPage, type: EnumChartType.FH },
    //   { name: '空调负荷查询', page: WellpumpqueryPage, type: EnumChartType.Air },
    // ];

    let popover = this.popoverCtrl.create('PopoverPage', { list: popoverList });
    popover.present({
      ev: myEvent
    });
  }
  allRead() {
    this.presentConfirm();
  }
  async presentConfirm() {
    let okText,cancelText,tipText,readAllText;
    await this.translate.get('确定').subscribe(res => okText = res);
    await this.translate.get('取消').subscribe(res => cancelText = res);
    await this.translate.get('提示').subscribe(res => tipText = res);
    await this.translate.get('全部已阅').subscribe(res => readAllText = res);

    let alert = this.alertCtrl.create({
      title: tipText,
      message: readAllText+'?',
      buttons: [
        {
          text: cancelText,
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: okText,
          handler: () => {
            this.device.setAllAlarmState().then(res => {
              if (res) {
                this.loadDataList();
              }
            })
          }
        }
      ]
    });
    alert.present();
  }
  async showDetail(data) {
    let okText, alamText;
    await this.translate.get('ok').subscribe(res => okText = res);
    await this.translate.get('报警').subscribe(res => alamText = res);

    const alert = this.alertCtrl.create({
      title: alamText,
      subTitle: data.F_AlarmTimeStr,
      message: data.F_AlarmText,
      buttons: [okText]
    });
    alert.present();
  }
  showAlert() {

  }

}
