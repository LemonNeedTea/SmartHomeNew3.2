import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/toPromise";
import "rxjs/Rx";
import { LoadingController, ToastController } from 'ionic-angular';
import { ConfigProvider } from '../config/config';
import { ToolsProvider } from '../tools/tools';

import { LoadingHelperProvider } from '../tools/loadingHelper';


@Injectable()
export class HttpServicesProvider {
    constructor(
        private http: Http,
        private loading: LoadingHelperProvider,
        private toastCtrl: ToastController,
        private config: ConfigProvider,
        private tools: ToolsProvider) {
    }

    headers = new Headers({ 'Content-Type': 'application/x-www' });
    options = new RequestOptions({ headers: this.headers });

    //get请求
    get(url: string) {
        // const loader = this.loading.create({
        //     // content: "Please wait...",
        //     duration: 3000
        // });
        // loader.present();
        return new Promise((resolve: any, reject) => {
            this.http.get(url, {
                headers: new Headers({
                    "Accept": "application/json",
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                })
            }).subscribe(res => {
                // loader.dismiss();
                resolve(res.json());
            }, err => {
                let toast = this.toastCtrl.create({
                    message: "请求失败！",
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
                // loader.dismiss();
            });

        });
    }

    //post请求
    post(url: string, params: any, isLoading: boolean = true) {
        //参数转换
        let urlParams = new URLSearchParams();
        for (const key in params) {
            urlParams.set(key, params[key]);
        }
        urlParams.set("IsEn",this.tools.getIsEn());
        // let loader;
        // if (isLoading === true) {
        //     loader = this.loading.create({
        //         // content: "Please wait..."
        //     });
        //     loader.present();
        // }
        if (isLoading === true) {
            this.loading.show();
        }

        return new Promise((resolve: any, reject) => {
            this.http.post(this.config.apiUrl + url, urlParams, {
                headers: new Headers({
                    "Accept": "application/json",
                    "Content-Type": "application/x-www-form-urlencoded"
                })
            })
                .subscribe(res => {
                    // if (isLoading) {
                    //     loader.dismiss();
                    // }
                    if (isLoading === true) {
                        this.loading.hide();
                    }
                    try {
                        resolve(res.json());
                    } catch (error) {

                    }

                }, err => {
                    let toast = this.toastCtrl.create({
                        message: "请求失败！",
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                    if (isLoading) {
                        // loader.dismiss();
                        if (isLoading === true) {
                            this.loading.hide();
                        }
                    }
                    reject('');
                });
        });

    }

    postMain(url: string, params: any = {}, isLoading: boolean = true) {
        return new Promise((resolve) => {
            let username = this.tools.getUserName();
            if (username) {
                params['UserName'] = username;
                this.post(url, params, isLoading).then(res => {
                    if (res["MainData"] != null) {
                        resolve(res["MainData"]);
                    }
                }, err => { });
            }

        });
    }
}