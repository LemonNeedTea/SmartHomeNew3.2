import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { DeviceRequestsProvider } from '../../../providers/tools/requests'
/**
 * Generated class for the YingshiCameraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-yingshi-camera',
  templateUrl: 'yingshi-camera.html',
})
export class YingshiCameraPage {

  width: number;
  height: number;
  srcUrl: any;
  name: string;
  id: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private sanitizer: DomSanitizer, private device: DeviceRequestsProvider) {
    this.name = this.navParams.get("name");
    this.id = this.navParams.get("id");
  }

  ionViewDidLoad() {
    this.width = window.innerWidth;
    this.height = parseInt(this.width)-50;
    this.device.getYingShiCaremaToken().then((res: any) => {
      const url = `https://open.ys7.com/ezopen/h5/iframe_se?url=ezopen://IYMDPZ@open.ys7.com/D96580056/1.hd.live&autoplay=1&audio=1&accessToken=${res.data.accessToken}&templete=2`;
      this.srcUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    })
      //     /* 获取播放器元素 */
      // var player = document.getElementById('ysopen')['contentWindow'];
      // /* iframe 支持方法 */
      // player.postMessage("play", "https://open.ys7.com/ezopen/h5/iframe") /* 播放 */
      // player.postMessage("stop", "https://open.ys7.com/ezopen/h5/iframe") /* 结束 */
      // player.postMessage("capturePicture", "https://open.ys7.com/ezopen/h5/iframe") /* 截图 */
      // player.postMessage("openSound", "https://open.ys7.com/ezopen/h5/iframe") /* 开启声音 */
      // player.postMessage("closeSound", "https://open.ys7.com/ezopen/h5/iframe") /* 关闭声音 */
      // player.postMessage("startSave", "https://open.ys7.com/ezopen/h5/iframe") /* 开始录制 */
      // player.postMessage("stopSave", "https://open.ys7.com/ezopen/h5/iframe") /* 结束录制 */


  }

}
