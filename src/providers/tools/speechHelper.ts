import { Injectable, OnInit } from '@angular/core';
// import { Variable } from '../../providers/model/variable';
import { ToolsProvider } from '../tools/tools';
import { LoadingController, Events } from 'ionic-angular';
import { DeviceRequestsProvider } from '../../providers/tools/requests';
import { variable } from '@angular/compiler/src/output/output_ast';
import { Variable } from '../model/variable';

declare let Baiduasrtts: any;

@Injectable()
export class SpeechHelperProvider implements OnInit {
    speakText: string;
    loading: any;
    timeout: any;
    isfirst: boolean = true;
    constructor(
        private tools: ToolsProvider,
        private events: Events,
        private loadingCtrl: LoadingController,
        private device: DeviceRequestsProvider
    ) {
        try {
            if (Baiduasrtts) {
                Baiduasrtts.startSpeechRecognize(null, e => {
                }, r => {

                });

            }
        } catch (err) {

        }

    }
    ngOnInit() {
    }

    presentLoadingCustom() {
        this.loading = this.loadingCtrl.create({
            spinner: 'dots',
            content: '语音识别中'
        });
        this.loading.present();
        this.timeout = setTimeout(() => {
            if (this.loading != null) {
                this.loading.dismiss();
                this.initTTSconfig("语音识别失败！")
                this.tools.presentToast("语音识别失败！")
            }
        }, 10000);
    }
    dismissLoading() {
        if (this.loading != null) {
            this.loading.dismiss();
            this.loading = null;
            clearTimeout(this.timeout);
        }
    }
    startSpeech() {
        this.startSpeechRecognize();
        // if (this.isfirst) {
        //   this.startSpeechRecognize();
        //     this.isfirst = false;
        // }
    }
    private startSpeechRecognize() {
        // 开启语音识别
        Baiduasrtts.startSpeechRecognize(null, e => {
        }, r => {

        });
        // 开启语音识别


        // 语音识别事件监听
        Baiduasrtts.addEventListener((res: any) => {
            // res参数都带有一个type
            if (!res) {
                return;
            }

            switch (res.type) {
                case "asrReady": {
                    // 识别工作开始，开始采集及处理数据
                    // document.getElementById('v_status').innerHTML = "识别工作开始，开始采集及处理数据";
                    this.presentLoadingCustom();
                    break;
                }

                case "asrBegin": {
                    // 检测到用户开始说话
                    // document.getElementById('v_status').innerHTML = "检测到用户开始说话"

                    //  alert("检测到用户开始说话");

                    break;
                }

                case "asrEnd": {
                    // 本地声音采集结束，等待识别结果返回并结束录音

                    // this.initTTSconfig(this.speakText);
                    // document.getElementById('v_status').innerHTML = "本地声音采集结束，等待识别结果返回并结束录音"
                    //  alert("本地声音采集结束，等待识别结果返回并结束录音");

                    break;
                }

                case "asrText": {
                    // 语音识别结果
                    // alert(JSON.stringify(res));
                    this.speakText = res.message.results_recognition;
                    // alert(this.speakText);
                    break;
                }

                case "asrFinish": {
                    // 语音识别功能完成
                    this.dismissLoading();
                    let rese = `${this.speakText}`;
                    this.dealData(rese);
                    // Baiduasrtts.synthesizeSpeech(rese, (e) => { }, (r) => { });
                    // this.initTTSconfig(rese);

                    break;
                }

                case "asrCancel": {
                    // 语音识别取消

                    break;
                }
                case "asrWakeUpStarted":{
                    alert("唤醒启动");
                    break;
                }

                default:
                    break;
            }

        }, (err) => {
            // document.getElementById('v_status').innerHTML = "未检测到语音识别数据";
            this.dismissLoading();
            this.tools.presentToast("未检测到语音数据")
            this.initTTSconfig("未检测到语音数据");
        });
    }
    private dealData(data: string) {
        this.device.getSpeechDataList(data).then((res: any) => {

            if (res.success) {
                let temp = res.data;
                console.log(temp);
                switch (temp.type) {
                    case 'mode': {
                        Variable.socketObject.setMode(temp.data, true);
                        break;
                    } case 'device': {
                        Variable.socketObject.setDeviceState(temp.id, temp.name, temp.state, true);
                        break;
                    }
                }
            } else {
                let text = `${res.message}`;
                this.initTTSconfig(text);
            }
        });
    }

    initTTSconfig(data: string) {
        Baiduasrtts.initTTSconfig((e) => { }, (r) => { });
        Baiduasrtts.synthesizeSpeech(data, (e) => { }, (r) => { });
    }
}