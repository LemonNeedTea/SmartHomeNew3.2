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

        });
        // Variable.socketObject = this.socket;
    }

    closeSocket() {
        this.socket.ws.close();
        this.socket.ws = null;
        clearInterval(this.interval);
        for (const key in this.events["_channels"]) {
            if (this.events["_channels"].hasOwnProperty(key)) {
                if (key !== 'user:created' && key !== 'vibrate') {
                    delete this.events["_channels"][key];
                }

            }
        }
    }
    setDeviceState(id: string, name: string, state: number, speech: boolean = false) {
        var param = {
            Type: 'set',
            UserName: this.tools.getUserName(), //用户名
            MonitorID: 1, //设备ID
            DeviceID: id,
            SetState: Number(state)
        };
        console.log(param);
        this.socket.sendMessage(param);
        this.tools.vibrate();
        this.presentLoading(name, "state");
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
        if (controlData && controlData.speech) {
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
    setAir(data: any, MonitorID: number, fnID: number) {
        this.presentLoading("");
        // let controlData = this.tools.getSendControl(data);
        var param = {
            Type: 'set',
            UserName: this.tools.getUserName(), //用户名
            FnID: fnID,
            MonitorID: MonitorID,
            controlData: data
        };
        console.log(param);
        this.socket.sendMessage(param);
        // Variable.controlDevice = {
        //     name: name,
        //     type: 'air'
        // };
    }
    sendMessage(monitorID: number, fnID: number, data: string, isLoading = true) {
        !isLoading || this.presentLoading("");
        // let controlData = this.tools.getSendControl(data);
        var param = {
            Type: 'set',
            UserName: this.tools.getUserName(), //用户名
            FnID: fnID,
            MonitorID: monitorID,
            controlData: data
        };
        console.log(param);
        this.socket.sendMessage(param);
    }
    setMode(data: any, speech: boolean = false) {
        this.presentLoading(data.F_Name);
        this.tools.vibrate();
        var param = {
            Type: 'set',
            UserName: this.tools.getUserName(), //用户名
            MonitorID: data.F_MonitorID,
            FnID: data.F_FnID,
            controlData: `${data.F_SettingCode},${data.F_AgreementID}`,
            speech: speech
        }
        console.log(param);
        this.socket.sendMessage(param);
        Variable.controlDevice = {
            id: '-2',
            state: data.F_AgreementID,
            name: data.F_Name,
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
        console.log(param);
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
    getFnData(fnID: string, MonitorID: number = 1) {
        let param = {
            Type: 'get',
            UserName: this.tools.getUserName(), //用户名
            MonitorID: MonitorID,
            FnID: fnID
        };
        console.log(param);
        this.socket.sendMessage(param);

    }
    getAirData(MonitorID: number = 1) {
        let param = {
            Type: 'get',
            UserName: this.tools.getUserName(), //用户名
            MonitorID: MonitorID,
            FnID: 60
        };
        console.log(param);
        this.socket.sendMessage(param);
        this.presentLoading("");

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

        if (data.FnID <= 40)
            console.log(data);
        switch (data.Type) {
            case 'state': {
                let dealData = data.Data;
                this.getAuto(dealData);//获取手自动状态
                this.getModeID(dealData);//获取模式ID
                this.getDeviceOpenNum(dealData);
                dealData = this.checkDeviceComplateState(dealData);
                Variable.SetFnData('state', dealData);
                this.events.publish("FnData:state", dealData);
                break;
            }
            case 'get':
                {
                    // console.log(data);
                    let dealData = data.Data;
                    let fnID = this.tools.getMonitorFnID(data.FnID, data.MonitorID);
                    Variable.SetFnData(fnID, dealData);
                    this.events.publish("FnData:" + fnID, dealData);


                    break;
                }
            case 'set':
                {
                    console.log(data);
                    if (!data.Result) {
                        this.tools.presentToast(data.Msg);
                        this.dismissLoading();
                    }
                    switch (data.FnID) {
                        case 40://设备设置
                            {
                                break;
                            }
                        case 41://模式和定时设置
                            {
                                let controlData = Variable.controlDevice;
                                if (!data.Result) {
                                    // this.tools.presentToast(data.Msg);
                                    this.speechDevice(controlData, false);
                                    // this.dismissLoading();
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
        let auto = data['0'][0] == '0' ? true : false;
        Variable.isAuto = auto;
        this.events.publish("FnData:isAuto", auto);
        // console.log("auto",auto);
        // if(auto){
        //     this.tools.presentToast("当前位手动模式，设备不可控");
        // }
    }
    private getModeID(data: any) {
        let modeID = data["-2"][0];
        if (modeID) {
            Variable.modeID = modeID;
            this.events.publish("FnData:modeID", modeID);
        }
    }
    private getDeviceOpenNum(data: any) {
        let sum = 0;
        for (const key in data) {
            if (data.hasOwnProperty(key) && Number(key) > 0) {
                let element = data[key][0];
                if (element == 1) {
                    sum++;
                }
            }

        };
        Variable.deviceNum = sum;
        this.events.publish("FnData:DeviceOpenNum", sum);

    }
    private checkDeviceComplateState(dealData: any) {
        let controlData = Variable.controlDevice;
        if (controlData) {
            if (controlData.state == dealData[controlData.id][0]) {
                this.dismissLoading();
                this.speechDevice(controlData);
            } else {
                dealData[controlData.id][0] = controlData.state;
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