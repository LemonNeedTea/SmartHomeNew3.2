import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';
import { Variable } from '../../providers/model/variable';

@Injectable()
export class LoadingHelperProvider {

    constructor(private loading: LoadingController) {

    }
    show(text: string="") {
        if (Variable.loadingObj == null || Variable.loadingNum <= 0) {
            Variable.loadingObj = this.loading.create({
                content: text
            });
            Variable.loadingObj.present();
        }
        Variable.loadingNum++;
    }
    hide() {
        if (Variable.loadingNum > 1) {
            Variable.loadingNum--;
        } else {
            Variable.loadingNum = 0;
            if (Variable.loadingObj) {
                Variable.loadingObj.dismiss();
                Variable.loadingObj = null;
            }

        }
    }
}