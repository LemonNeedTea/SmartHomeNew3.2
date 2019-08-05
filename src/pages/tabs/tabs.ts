import { Component } from '@angular/core';
import { Events } from 'ionic-angular'

import { MessagePage } from '../message/message';
import { HomePage } from '../home/home';
import { RoomPage } from '../room/room';
import { DevicePage } from '../device/device';
import { EnergyPage } from '../energy/energy';
import { DeviceRequestsProvider } from "../../providers/tools/requests";
import { Variable } from '../../providers/model/variable';
import { JPush } from '@jiguang-ionic/jpush';

@Component({
  templateUrl: 'tabs.html',
  selector: 'tabs'
})
export class TabsPage {
  tabRoots: any;
  interval: any;

  constructor(private device: DeviceRequestsProvider,
    private events: Events,
    private jpush: JPush) {
    this.tabRoots = [
      {
        root: HomePage,
        tabTitle: '首页',
        tabIcon: 'home'
      }
      , {
        root: RoomPage,
        tabTitle: '房间',
        tabIcon: 'photos'
      }
      , {
        root: DevicePage,
        tabTitle: '设备',
        tabIcon: 'options',
        tabBadge: 0,
        tabBadgeStyle: 'danger'
      }
      , {
        root: EnergyPage,
        tabTitle: '用能',
        tabIcon: 'stats'
      }, {
        root: MessagePage,
        tabTitle: '消息',
        tabIcon: 'chatboxes',
        tabBadge: 0,
        tabBadgeStyle: 'danger'
      }
    ];
    this.getMessageNum();
    this.getDeviceOpenNum();
  }
  ionViewDidLoad() {
    this.interval = setInterval(() => {
      this.getMessageNum();
    }, 10000);
    this.events.subscribe("FnData:MessageNum", (res: any) => {
      this.tabRoots[4].tabBadge = res;
      this.jpush.setApplicationIconBadgeNumber(Number(res));
    });
  }
  ionViewWillLeave() {
    clearInterval(this.interval);
  }
  getMessageNum() {
    this.device.getAlarmDataList(false).then((res: any) => {
      this.tabRoots[4].tabBadge = res.length;
      this.jpush.setApplicationIconBadgeNumber(Number(res.length));
      this.events.publish("data:messageList", res);
    })
    // this.http.post('EnergyAppData/GetMessageData',null,false).then(res=>{
    //   let data=res['MainData'];
    //   this.tabRoots[2].tabBadge = data.length;
    // });
  }
  private getDeviceOpenNum() {
    this.tabRoots[2].tabBadge = Variable.deviceNum;
    this.events.subscribe("FnData:DeviceOpenNum", (res: any) => {
      this.tabRoots[2].tabBadge = res;
    });
  }
}
