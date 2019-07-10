import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ConfigProvider {

  //api请求地址
  // public apiUrl = "http://223.112.4.23:11000";
  public apiUrl = "http://192.168.40.110:806";

  //websokcet地址
  public websocketUrl = "ws://223.112.4.23:53200";
  // public websocketUrl = "ws://192.168.4.113:5555";

  //用户信息localstorage存储名称
  public userInfoSotrageName='userinfo';

  constructor() { }


}
