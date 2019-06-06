import { Injectable } from '@angular/core';
import { Variable } from '../../providers/model/variable';
import { ToolsProvider } from '../tools/tools';
import { LoadingController, Events } from 'ionic-angular';
import { WebSocketProvider } from '../../providers/ws';
import { Subscription } from 'rxjs/Subscription';

declare let Baiduasrtts: any;
@Injectable()
export class SocketHelpProvider {
    private socketSubscription: Subscription;
    private loading: any = null;
    private timeout: any;
    private interval: any;
    constructor(
        private tools: ToolsProvider,
        private events: Events,
        private socket: WebSocketProvider,
        private loadingCtrl: LoadingController
    ) {

    }
    /**
       * 启动websocket
       */
    startSocket() {
        // this.events.publish("FnData:51");
        // this.events.publish("FnData:50");
        // this.events.publish("FnData:54");
        this.socket.createObservableSocket(this.tools.getUserName()).subscribe(res => {
            this.socketMessageHandle(res);
        }, err => {

            setTimeout(() => {
                this.startSocket();
            }, 1000);

        }, () => {
            setTimeout(() => {
                this.startSocket();
            }, 1000);
        });
        // Variable.socketObject = this.socket;
    }

    closeSocket() {
        this.socket.ws.close();
        clearInterval(this.interval);
        for (const key in this.events["_channels"]) {
            if (this.events["_channels"].hasOwnProperty(key)) {
                if (key !== 'user:created' && key !== 'vibrate') {
                    delete this.events["_channels"][key];
                }

            }
        }
    }
    setDeviceState(id: string, name: string, state: number, speech: false) {
        var param = {
            Type: 'set',
            UserName: this.tools.getUserName(), //用户名
            MonitorID: 1, //设备ID
            DeviceID: id,
            SetState: Number(state)
        };
        this.socket.sendMessage(param);
        this.tools.vibrate();
        this.presentLoading(name, "51");
        Variable.controlDevice = {
            id: id,
            state: state,
            name: name,
            speech: speech,
            type: 'device'
        };
    }
    private initTTSconfig(data: string) {
        Baiduasrtts.initTTSconfig((e) => { }, (r) => { });
        Baiduasrtts.synthesizeSpeech(`${data}`, (e) => { }, (r) => { });
    }
    private speechDevice(controlData: any, success: boolean = true) {
        let statestr = "";
        if (controlData.speech) {
            if (controlData.type === 'model') {
                statestr = "打开";
            } else {

                switch (Number(controlData.state)) {
                    case 0: {
                        statestr = "关闭"; break;
                    } case 1: {
                        statestr = "打开"; break;
                    } case 2: {
                        statestr = "停止"; break;
                    }
                }
            }

            let message = `${controlData.name}${statestr}${success == true ? "成功" : "失败"}`;
            this.initTTSconfig(message);
        }

    }
    setTimer(data: any, name: string = "定时") {
        this.presentLoading(name);
        let controlData = this.tools.getSendControl(data);
        var param = {
            Type: 'set',
            UserName: this.tools.getUserName(), //用户名
            MonitorID: 1,
            FnID: 41,
            controlData: controlData
        };
        console.log(param);
        this.socket.sendMessage(param);
    }
    setMode(id: string, name: string, speech: boolean = false) {
        this.presentLoading(name);
        this.tools.vibrate();
        var param = {
            Type: 'set',
            UserName: this.tools.getUserName(), //用户名
            MonitorID: 1,
            FnID: 41,
            controlData: `3,${id}`,
            speech: speech
        }
        // console.log(param);
        this.socket.sendMessage(param);
        Variable.controlDevice = {
            id: '-2',
            state: id,
            name: name,
            speech: speech,
            type: 'model'
        };
    }
    setModeDetail(agreementID: string) {
        this.presentLoading("保存中...");
        let param = {
            Type: 'setmode',
            UserName: this.tools.getUserName(), //用户名
            MonitorID: 1,
            ControlData: agreementID
        }
        this.socket.sendMessage(param);

    }
    presentLoading(content: string, fnID?: string) {
        this.dismissLoading();
        this.loading = this.loadingCtrl.create({
            content: content
        });
        this.loading.present();
        this.timeout = setTimeout(() => {
            let controlData = Variable.controlDevice;
            if (controlData) {
                this.speechDevice(controlData, false);
            }
            this.tools.presentToast("设置超时");
            this.dismissLoading();
            //重新获取状态
            if (fnID) {
                this.getFnData(fnID);
            }
            if (Variable.controlDevice) {
                Variable.controlDevice = null;
            }
        }, 30000);

    }
    getFnData(fnID: string) {
        let param = {
            Type: 'get',
            UserName: this.tools.getUserName(), //用户名
            MonitorID: 1,
            FnID: fnID
        };
        this.socket.sendMessage(param);
    }
    dismissLoading() {
        if (this.loading) {
            this.loading.dismiss();
        }
        this.loading = null;
        clearTimeout(this.timeout);
        if (Variable.controlDevice) {
            Variable.controlDevice = null;
        }
    }
    socketMessageHandle(data: any) {
        console.log(data);
        switch (data.Type) {
            case 'get':
                {
                    let dealData = data.Data;
                    if (data.FnID == '51') {
                        this.getAuto(data.Data);//获取手自动状态
                        this.getDeviceOpenNum(data.Data);
                        dealData = this.checkDeviceComplateState(dealData);
                        // this.getDeviceOpenNum(dealData);

                    }
                    Variable.SetFnData(data.FnID, dealData);
                    this.events.publish("FnData:" + data.FnID, dealData);
                    break;
                }
            case 'set':
                {
                    switch (data.FnID) {
                        case 40://设备设置
                            {
                                break;
                            }
                        case 41://模式和定时设置
                            {
                                let controlData = Variable.controlDevice;
                                if (!data.Result) {
                                    this.tools.presentToast(data.Msg);
                                    this.speechDevice(controlData, false);
                                    this.dismissLoading();
                                } else {
                                    if (controlData) {
                                        if (controlData.type === 'model') {

                                        } else {
                                            this.dismissLoading();
                                        }
                                    } else {
                                        this.dismissLoading();
                                    }
                                }

                                break;
                            }
                    }
                    // showSetInfo(data);
                    break;
                }
            case 'login':
                {
                    // unRefreshArr = {};
                    if (data.Result === true) {//登录成功

                    }
                    break;
                }
            case 'alarm':
                {
                    // this.popupAlarmMessage(data.Data.F_AlarmText);
                    break;
                }
            case "setmode": {
                if (!data.Result) {
                    this.tools.presentToast(data.Msg);
                }
                this.dismissLoading();
                break;
            }
        };




    }
    /**
     * 私有函数
     */
    private getAuto(data: any) {
        let auto = data['0'] == '0' ? true : false;
        Variable.isAuto = auto;
        this.events.publish("FnData:isAuto", auto);
        // console.log("auto",auto);
        // if(auto){
        //     this.tools.presentToast("当前位手动模式，设备不可控");
        // }
    }
    private getDeviceOpenNum(data: any) {
        let sum = 0;
        for (const key in data) {
            if (data.hasOwnProperty(key) && Number(key) > 0) {
                let element = data[key];
                if (Boolean(element)) {
                    sum++;

                }
            }

        };
        this.events.publish("FnData:DeviceOpenNum", sum);
        Variable.deviceNum = sum;
    }
    private checkDeviceComplateState(dealData: any) {
        let controlData = Variable.controlDevice;
        if (controlData) {
            if (controlData.state == dealData[controlData.id]) {
                this.dismissLoading();
                this.speechDevice(controlData);
            } else {
                dealData[controlData.id] = controlData.state;
            }
        }
        return dealData;
    }
    // private popupAlarmMessage(data: string) {
    //     this.tools.presentAlarmAlert(data);
    // }
    // private getDeviceOpenNum(data: any) {
    //     let num: number = 0;
    //     data.forEach(element => {
    //         if (Number(element) == 1) {
    //             num++;
    //         }
    //     });
    //     Variable.deviceNum = num;
    //     this.events.publish("FnData:deviceNum", num); console.log(num);

    // }

}