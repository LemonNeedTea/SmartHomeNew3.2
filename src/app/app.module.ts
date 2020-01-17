import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HttpModule } from "@angular/http";
import { IonicStorageModule } from '@ionic/storage';
import { DatePipe } from '@angular/common';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { WebSocketService } from 'angular2-websocket-service';
import { MultiPickerModule } from 'ion-multi-picker';


//原生native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { QRScanner } from '@ionic-native/qr-scanner';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Network } from '@ionic-native/network';
import { Vibration } from '@ionic-native/vibration';
import { JPush } from '@jiguang-ionic/jpush';
import { Device } from '@ionic-native/device';

//自定义工厂
import { WebSocketProvider } from "../providers/ws";
import { ConfigProvider } from '../providers/config/config';
import { StorageProvider } from '../providers/storage/storage';
import { ToolsProvider } from '../providers/tools/tools';
import { HttpServicesProvider } from "../providers/http-services/http-services";
import { LoginRequestsProvider, DeviceRequestsProvider } from "../providers/tools/requests";
import { chartToolsProvider } from "../providers/tools/chart";
import { SocketHelpProvider } from '../providers/tools/socketHelper';
import { ServerSocket } from '../providers/server-socket.service';
import { SpeechHelperProvider } from '../providers/tools/speechHelper';
import { LoadingHelperProvider } from '../providers/tools/loadingHelper';




//新增页面
import { LoginPage } from '../pages/login/login';
import { MessagePage } from '../pages/message/message';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { RoomPage } from '../pages/room/room';
import { DevicePage } from '../pages/device/device';
import { EnergyPage } from '../pages/energy/energy';

//组件
import { ComponentsModule } from '../components/components.module';

// 导入包
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";



@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MessagePage,
    HomePage,
    TabsPage,
    RoomPage,
    DevicePage,
    EnergyPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicImageViewerModule,
    IonicModule.forRoot(MyApp, { backButtonText: '', tabsHideOnSubPages: 'true' }),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    ComponentsModule,
    MultiPickerModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MessagePage,
    HomePage,
    TabsPage,
    RoomPage,
    DevicePage,
    EnergyPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    QRScanner,
    ScreenOrientation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HttpServicesProvider,
    DatePipe,
    WebSocketProvider,
    ConfigProvider,
    StorageProvider,
    ToolsProvider,
    LoginRequestsProvider,
    DeviceRequestsProvider,
    Network,
    chartToolsProvider,
    SocketHelpProvider,
    WebSocketService,
    ServerSocket,
    SpeechHelperProvider,
    Vibration,
    JPush,
    Device, LoadingHelperProvider
  ]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}