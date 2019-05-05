import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events, MenuController, Keyboard } from 'ionic-angular';
import { TabsPage } from "../tabs/tabs";
import { LoginRequestsProvider } from '../../providers/tools/requests';



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private loginRequest: LoginRequestsProvider,
    private events: Events,
    private menuCtrl: MenuController,
    private keyboard: Keyboard) {
  }
  ionViewDidLoad() {
    this.menuCtrl.enable(false);
  }
  ionViewDidLeave() {
    this.menuCtrl.enable(true);
  }
  Login(username: HTMLInputElement, password: HTMLInputElement) {
    // this.keyboard.close();
    // this.navCtrl.setRoot(TabsPage);
    this.loginRequest.login(username.value, password.value).then(res => {
      this.navCtrl.setRoot(TabsPage);
    }, err => { });

  }
}
