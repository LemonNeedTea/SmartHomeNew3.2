import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DeviceRequestsProvider } from '../../providers/tools/requests';
// import { ModeDeviceSelectedSettingPage } from '../mode-device-selected-setting/mode-device-selected-setting';
import { deepCopy } from 'ionic-angular/umd/util/util';
import { Variable } from '../../providers/model/variable';

/**
 * Generated class for the ModeSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mode-setting',
  templateUrl: 'mode-setting.html',
})
export class ModeSettingPage {
  modeID: string;
  name: string;
  dataList: any;
  alarm: boolean = true;
  mode: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private device: DeviceRequestsProvider,
    private modalCtrl: ModalController) {
    this.mode = this.navParams.get("mode");
    this.modeID = this.mode.F_AgreementID;
    this.name = this.mode.F_Name;
    this.alarm = this.mode.F_SecurityRun;
    ;
    this.getModeDeviceDataList();
  }
  getModeDeviceDataList() {
    this.device.GetDeviceModeDetailDatas(this.modeID).then(res => {
      this.dataList = res; 
    });
  }
  ionViewDidLoad() {

  }
  presentShowModal() {
    let data: any = JSON.parse(JSON.stringify(this.dataList));
    let profileModal = this.modalCtrl.create('ModeDeviceSelectedSettingPage', { dataList: data });
    profileModal.onDidDismiss(data => {
      if (data) {
        this.dataList = data;
      }
    });
    profileModal.present();
  }
  saveMode() {
    let paramsData = [];
    this.dataList.forEach(element => {
      element.data.forEach(data => {
        if (data.Control) {
          paramsData.push({
            F_DeviceID: data.DeviceID,
            F_Open: data.Open
          });
        }

      });
    });
    this.mode.F_SecurityRun = this.alarm;
    console.log(paramsData);
    this.device.setModeDetail(this.mode, paramsData).then(res => {
      if (res == true) {
        Variable.socketObject.setModeDetail(this.mode.F_AgreementID);
        this.navCtrl.pop();
      }
    });
  }

}
