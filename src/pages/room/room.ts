import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { DeviceRequestsProvider } from '../../providers/tools/requests';
import { Variable } from '../../providers/model/variable';
// import { RoomdevicePage } from '../../pages/roomdevice/roomdevice';

/**
 * Generated class for the RoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage {
  floors: any;
  rooms: any;
  floorStartNumArr: any = {};
  roomStartNumArr: any = {};
  floorAndRoomArr: any;
  floorResultData: any = {};
  roomResultData: any = {};
  private isFirst = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, private device: DeviceRequestsProvider,
    private events: Events) {
    this.device.getFloorDataList().then((res: any) => {
      this.floors = res;
      res.forEach(element => {
        this.floorStartNumArr[element.F_ID] = 0;
      });
      this.device.getRoomDataList().then((res1: any) => {
        this.rooms = res1;
        res1.forEach(element => {
          this.roomStartNumArr[element.F_ID] = 0;
        });
        //
        this.device.getDeviceIDtoRoomaAndFloorID().then((res3) => {
          this.floorAndRoomArr = res3;
          this.getFn51Data();
          this.isFirst = false;
        })
      });
    });
  }


  ionViewDidEnter() {
    // if (!this.isFirst) {
    //   this.getFn51Data();
    // }

  }

  getFn51Data() {
    let data = Variable.GetFnData('51');
    this.getTypeDeviceNum(data);
    this.events.subscribe("FnData:51", (res) => {console.log("room-fn51");
      this.getTypeDeviceNum(res);
    });
  }
  getTypeDeviceNum(data: any) {
    let floorResult = JSON.parse(JSON.stringify(this.floorStartNumArr));
    let roomResult = JSON.parse(JSON.stringify(this.roomStartNumArr));
    for (const key in data) {
      if (data.hasOwnProperty(key) && Number(key) > 0) {
        const state = data[key];
        let floorAndRoomID = this.floorAndRoomArr[key];
        if (!floorAndRoomID) {
          continue;
        }
        let floorID = floorAndRoomID[1];
        let roomID = floorAndRoomID[0];
        let element = data[key];
        if (Boolean(element)) {
          floorResult[floorID]++;
          roomResult[roomID]++;
        }
      }
    };
    this.floorResultData = floorResult;
    this.roomResultData = roomResult;
  }
  goRoomDevice(id: string, name: string) {
    this.navCtrl.push('RoomdevicePage', { id: id, name: name });
  }
  // ionViewDidLeave() {
  //   this.events.unsubscribe("FnData:51",()=>{});
  // }

}
