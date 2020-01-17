import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events, ModalController, Tabs, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { ToolsProvider } from '../providers/tools/tools';
import { LoginRequestsProvider } from '../providers/tools/requests';
import { Network } from '@ionic-native/network';
// import { PasswordPage } from '../pages/password/password';
import { TranslateService } from '@ngx-translate/core';
import{ ConfigProvider } from '../providers/config/config';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;
  //  rootPage: any ;
  username: string = '';
  accountSetName: string = '';
  vibrate: boolean;
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private tools: ToolsProvider,
    private loginRequest: LoginRequestsProvider,
    public events: Events,
    private modalCtrl: ModalController,
    private network: Network,
    private toastCtrl: ToastController,
    private translate: TranslateService,
    public config: ConfigProvider) {
    platform.ready().then(() => {//app启动成功执行
      statusBar.styleDefault();
      splashScreen.hide();
      //开启网络状态监测
      if (platform.is('cordova')) {
        this.startNetDetect();

      }
      //接受订阅用户名称
      events.subscribe('user:created', (user, time) => {
        this.username = user['username'];
        this.accountSetName = user['accountsetname'];
      });
      events.subscribe("vibrate", res => {
        this.vibrate = res;
      });
      //自动登录
      // this.autoLogin();
    });
    this.initTranslate();

    // 
  }
  pushPassword() {
    this.modalCtrl.create('PasswordPage').present();
  }
  /**
   * 开启网络状态监测
   */
  startNetDetect() {
    let toast: any = null;
    // watch network for a disconnection
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      toast = this.toastCtrl.create({
        message: '请检查网络！',
        position: 'top'
      });
      toast.present();
    });
    // watch network for a connection
    let connectSubscription = this.network.onConnect().subscribe(() => {
      if (toast) {
        toast.dismiss();
        toast = null;
      }

    });
    //网络状态改变提示
    if (this.network.onchange) {
      this.network.onchange().subscribe((data) => {
        let name: string = null;
        switch (this.network.type) {
          case 'wifi': { name = 'wifi'; break; }
          case '4g': { name = '4g'; break; }
          case 'cellular': { name = 'cellular'; break; }
        }
        if (name) {
          this.toastCtrl.create({
            message: '切换到' + this.network.type + '网络',
            duration: 3000,
            position: 'top'
          }).present();
        }
      });
    }


  }
  /**
   * 自动登录
   */
  // autoLogin() {
  //   this.loginRequest.autoLogin().then(res => {
  //     this.rootPage = TabsPage;
  //   }, err => {
  //     this.rootPage = LoginPage;
  //   });
  // }

  logout() {
    this.loginRequest.removeUserInfo();
    this.nav.setRoot(LoginPage);
  }
  setVibrate() {
    this.tools.setVibrate(this.vibrate);
  }
  initTranslate() {
    // 根据浏览器来判断字符集
    // this.translate.setDefaultLang('zh-cmn-Hans');
    let language = this.tools.getLanguageStorage();

    if (language){
      this.translate.use(language);
      if (language === 'en') {
        this.config.chinese=false;
      }
    }else{
      debugger;
      const browserLang = this.translate.getBrowserLang();
      this.tools

      if (browserLang) {
        if (browserLang === 'zh') {
          const browserCultureLang = this.translate.getBrowserCultureLang();

          if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
            this.translate.use('zh-cmn-Hans');
          } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
            this.translate.use('zh-cmn-Hant');
          }
        } else {
          this.translate.use(this.translate.getBrowserLang());
        this.config.chinese=false;
        }
      } else {
        // 设置翻译
        this.translate.use('zh-cmn-Hans');
      }
    }
    
   

  }
}
