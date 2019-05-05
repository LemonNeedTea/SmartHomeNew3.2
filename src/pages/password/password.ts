import { Component } from '@angular/core';
import { NavController, ViewController, MenuController, App, IonicPage } from 'ionic-angular';
import { DeviceRequestsProvider, LoginRequestsProvider } from '../../providers/tools/requests'
import { ToolsProvider } from '../../providers/tools/tools';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-password',
  templateUrl: 'password.html'
})
export class PasswordPage {
  confirmPassword: string;
  newPassword: string;
  password: string;
  constructor(public navCtrl: NavController, private viewCtrl: ViewController,
    private device: DeviceRequestsProvider,
    private login: LoginRequestsProvider,
    private tools: ToolsProvider,
    private menu: MenuController,
    private app: App) {

  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  complate() {
    if (!this.password) {
      this.tools.presentToast("原密码不能位空！");
      return null;
    }
    if (!this.newPassword) {
      this.tools.presentToast("新密码不能位空！");
      return null;
    }
    this.device.checkPassword(this.password).then(res => {
      if (this.password === this.newPassword) {
        this.tools.presentToast("新密码不能与原密码一致！");
      } else {
        if (this.newPassword === this.confirmPassword) {
          this.device.setNewPassword(this.password, this.newPassword).then(res => {
            this.dismiss();
            this.login.removeUserInfo();
            this.menu.close();
            // this.navCtrl.setRoot(LoginPage);
            this.app.getRootNav().setRoot(LoginPage);
          });
        } else {
          this.tools.presentToast("新密码两次输入不一致！");
        }
      }

    });
  }
}