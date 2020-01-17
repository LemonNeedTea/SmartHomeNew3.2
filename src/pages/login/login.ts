import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events, MenuController, Keyboard } from 'ionic-angular';
import { TabsPage } from "../tabs/tabs";
import { LoginRequestsProvider } from '../../providers/tools/requests';
import { ToolsProvider } from '../../providers/tools/tools';
import { TranslateService } from '@ngx-translate/core';


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
  username: string;
  password: string;
  isEdit = true;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private loginRequest: LoginRequestsProvider,
    private events: Events,
    private menuCtrl: MenuController,
    private keyboard: Keyboard,
    private tools: ToolsProvider,
    private translate: TranslateService) {
  }
  ionViewDidLoad() {
    this.menuCtrl.enable(false);
    this.autoLogin();
  }
  ionViewDidLeave() {
    this.menuCtrl.enable(true);
  }
  // Login() {
  //   // this.keyboard.close();
  //   // this.navCtrl.setRoot(TabsPage);
  //   this.loginRequest.login(this.username, this.password).then(res => {
  //     this.navCtrl.setRoot(TabsPage);
  //   }, err => { });

  // }
  login() {
    if(this.isEdit==false) return;
    this.isEdit = false;
    console.log('sss')
    this.removeClass();
    let loginObj = document.getElementById('login');

    loginObj.classList.add("active");
    try {
      setTimeout(() => {
        this.loginRequest.login(this.username, this.password).then(res => {
          setTimeout(() => {
            loginObj.classList.add('verity');
            setTimeout(() => {
              this.navCtrl.setRoot(TabsPage);

            }, 1000);

          }, 1000);
        }, err => {
          this.removeClass();
          this.isEdit = true;
        });
      }, 1000);

    } catch (error) {
      this.removeClass();
      this.isEdit = true;

    }


  }
  removeClass() {
    let loginObj = document.getElementById('login');
    if (loginObj.classList.contains("active")) {
      loginObj.classList.remove("active");
    }
    if (loginObj.classList.contains("verity")) {
      loginObj.classList.remove("verity");
    }
  }

  public changeLanguage() {
    // this.translate.use(language);
    this.tools.showLanguage();
  }
  autoLogin() {
    let userinfo = this.loginRequest.isExistUserInfoData();
    if (userinfo) {
      this.username = userinfo["txtUser"];
      this.password = userinfo["txtPwd"];
      this.login();
    }


    // this.loginRequest.autoLogin().then(res => {
    //   this.rootPage = TabsPage;
    // }, err => {
    //   this.rootPage = LoginPage;
    // });

  }
}
