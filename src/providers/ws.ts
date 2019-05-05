
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
// import {observable} from "rxjs/symbol/observable";
import { ConfigProvider } from '../providers/config/config';
import { LoadingController } from 'ionic-angular'


@Injectable()
export class WebSocketProvider {

  ws: WebSocket;
  interval: any;
  loading: any;
  constructor(private config: ConfigProvider, private loadingCtrl: LoadingController) {

  }
  createObservableSocket(username: string): Observable<any> {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.ws = new WebSocket(this.config.websocketUrl);
    this.ws.onopen = d => {
      let data = {
        type: 'login',
        UserName: username
      };
      this.sendMessage(data);
      this.dismissLoading();
    };
    return new Observable<any>(
      observable => {
        this.ws.onmessage = (event) => observable.next(JSON.parse(event.data));
        this.ws.onerror = (event) => {
          this.presentLoading();
          observable.error(event);
        };
        this.ws.onclose = (event) => {
          this.presentLoading();
          observable.complete();
        }
      }
    )
  }
  presentLoading() {

    if (this.loading) {

    } else {
      this.dismissLoading();
      this.loading = this.loadingCtrl.create({
        content: "连接中..."
      });
      this.loading.present();
    }

  }
  dismissLoading() {
    if (this.loading) {
      this.loading.dismiss();
    }
    this.loading = null;
  }

  sendMessage(message: any) {
    this.ws.send(JSON.stringify(message));
  }
}