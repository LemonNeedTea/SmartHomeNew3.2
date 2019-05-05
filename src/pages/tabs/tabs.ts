import { Component } from '@angular/core';

import { MessagePage } from '../message/message';
import { HomePage } from '../home/home';
import { RoomPage } from '../room/room';
import { DevicePage } from '../device/device';
import { EnergyPage } from '../energy/energy';
import { DeviceRequestsProvider } from "../../providers/tools/requests";

@Component({
  templateUrl: 'tabs.html',
  selector: 'tabs'
})
export class TabsPage {
  tabRoots: any;
  interval: any;

  constructor(private device: DeviceRequestsProvider) {
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
        tabIcon: 'options'
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
  }
  ionViewDidLoad() {
    this.interval = setInterval(() => {
      this.getMessageNum();
    }, 10000);
  }
  ionViewWillLeave() {
    clearInterval(this.interval);
  }
  getMessageNum() {
    this.device.getAlarmDataList(false).then((res: any) => {
      this.tabRoots[4].tabBadge = res.length;
    })
    // this.http.post('EnergyAppData/GetMessageData',null,false).then(res=>{
    //   let data=res['MainData'];
    //   this.tabRoots[2].tabBadge = data.length;
    // });
  }
}
