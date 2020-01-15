import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DeviceRequestsProvider } from '../../providers/tools/requests'
import { AnonymousSubject } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

/**
 * Generated class for the EleCostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ele-cost',
  templateUrl: 'ele-cost.html',
})
export class EleCostPage {

  year: number=2019;
  dataList=[];
  selectedMonth:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private device: DeviceRequestsProvider) {
  }

  ionViewDidLoad() {
    let date = new Date;
    this.year= date.getFullYear();
    this.loadData();
    
  }
  loadData(){
    this.device.getEleStepPrice(this.year).then((res: any) => {
      console.log(res);
      this.dataList = res;
    })
  }
  GetDetailData(item:any){
    if(item==this.selectedMonth){
      this.selectedMonth=null;
    }else{
    this.selectedMonth=item;
    }
  }
  pre(){
    this.year--;
    this.loadData();
  }
  next(){
    this.year++;
    this.loadData();
  }

}
