import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';
// import { BarchartPage } from '../barchart/barchart';
import { EnumDateType } from '../../providers/model/enumdata';

/**
 * Generated class for the EnergyQueryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-energy-query',
  templateUrl: 'energy-query.html',
})
export class EnergyQueryPage {
  name: string;
  type: string;
  dateType: EnumDateType;
  displayFormat: string;
  startDate: string;
  stopDate: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private tools: ToolsProvider) {
    this.name = this.navParams.get('name');
    this.type = this.navParams.get('type');
    this.dateType = EnumDateType.Day;
    this.dateTypeChange();
  }

  ionViewDidLoad() {
  }
  dateTypeChange() {
    let now = this.tools.getNowDateStr(this.dateType);
    this.startDate = this.stopDate = now;
    switch (this.dateType) {
      case EnumDateType.Year: {
        this.displayFormat = 'YYYY'; break;
      }
      case EnumDateType.Month: {
        this.displayFormat = 'YYYY-MM'; break;
      }
      case EnumDateType.Day: {
        this.displayFormat = 'YYYY-MM-DD'; break;
      }
    }
  }
  goBarChartPage(data?: any) {
    let params: any;
    if (data) {
      params = data;
    } else {
      params = {
        StartTime: this.startDate,
        StopTime: this.stopDate,
        DateType: this.dateType,
      }
    }
    params.Type = this.type;
    this.navCtrl.push('BarchartPage', { params: params });
  }
  timeRange(type: string) {
    let data;
    switch (type) {
      case 'yearall': {
        data = this.tools.getYearAllRange();
        break;
      }
      case 'year': {
        data = this.tools.getYearRange();
        break;
      }
      case 'month': {
        data = this.tools.getMonthRange();
        break;
      }
    }
    this.goBarChartPage(data);

  }

}
