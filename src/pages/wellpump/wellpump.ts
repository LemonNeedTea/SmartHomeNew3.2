import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController } from 'ionic-angular';
import { Variable } from '../../providers/model/variable';
import { chartToolsProvider } from '../../providers/tools/chart';
import { DeviceRequestsProvider } from '../../providers/tools/requests';
// import { WellpumpqueryPage } from '../wellpumpquery/wellpumpquery';
import { ToolsProvider } from '../../providers/tools/tools';
import { EnumDateType, EnumChartType } from '../../providers/model/enumdata';
// import { TimerPumpPage } from '../timer/timer-pump/timer-pump';



/**
 * Generated class for the WellpumpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wellpump',
  templateUrl: 'wellpump.html',
})

export class WellpumpPage {
  id: string;
  name: string;
  f50Data: any;
  f52Data: any;
  state: boolean;
  auto: boolean;

  levelChart: any;
  levelGuide: any;
  levelData: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private events: Events,
    private chart: chartToolsProvider,
    private device: DeviceRequestsProvider,
    private tools: ToolsProvider,
    public modalCtrl: ModalController) {
    this.id = this.navParams.get('id');
    this.name = this.navParams.get('name');
    let fn51Data = Variable.GetFnData('state');
    this.getDeviceState(fn51Data);
    this.events.subscribe("FnData:state", this.eventsFn51Handler);

    this.f50Data = Variable.GetFnData('50');
    this.events.subscribe("FnData:50", this.eventsFn50Handler);
    this.auto = Variable.isAuto;
    this.events.subscribe("FnData:isAuto", this.eventsFnAutoHandler);
  }
  getDeviceState(data: any) {
    if (data) {
      this.state = data[this.id][0];
    }
  }
  setDeviceState(state: string) {
    Variable.socketObject.setDeviceState(this.id, this.name, state);
  }

  ionViewDidLoad() {
    this.getWaterLevelChart();
    this.getWaterlevelMapChart();
  }
  ionViewWillEnter() {

  }
  ionViewWillUnload() {
    this.events.unsubscribe("FnData:50", this.eventsFn50Handler);
    this.events.unsubscribe("FnData:51", this.eventsFn51Handler);
    this.events.unsubscribe("FnData:52", this.eventsFn52Handler);
    this.events.unsubscribe("FnData:isAuto", this.eventsFnAutoHandler);
  }
  changeData() {
    this.levelGuide.position = [this.levelData[0].key, this.levelData[0].value];
    this.levelGuide.content = this.levelData[0].value;
    this.levelChart.changeData(this.levelData);
    this.levelChart.repaint();
  }
  getWaterLevelChart() {
    let fnData = Variable.GetFnData('52');
    let value = this.getWaterlevelData(fnData);
    this.levelData = [
      { key: '', value: value, type: '井水液位' }
    ];
    let config = {
      dw: 'm',
      max: 200,
      min: 0,
      tooltip: false
    };
    this.levelChart = this.chart.getBarChart('mountNode', this.levelData, config);
    this.levelGuide = this.levelChart.guide().text({
      position: [0, 0],
      content: 0,
      style: {
        // fill: color,
        textBaseline: 'bottom'
      },
      offsetY: -5
    });
    this.changeData();

    this.events.subscribe("FnData:52", this.eventsFn52Handler);

  }
  getWaterlevelData(data: any) {
    let temp = data['F529'];
    if (temp) {
      return temp * 1;
    }
  }
  getWaterlevelMapChart() {

    this.device.getEnergyQuery(-3).then((queryData: any) => {
      let data = queryData[0];
      let nowDateStr = this.tools.getNowDateStr(EnumDateType.Day);
      let start = this.tools.getFullDateStr(nowDateStr, EnumDateType.Day);
      let stop = this.tools.getAddDate(nowDateStr, EnumDateType.Day);
      let params = {
        MonitorID: data.F_MonitorID,
        ObjType: data.F_SortIndex,
        StartTime: start,
        StopTime: stop,
        // DateType: EnumDateType.Hour,
        FnID: data.F_GPRSFnID
      };
      this.device.getWaterlevelMapChartData(params).then((res: any) => {
        let config = {
          dw: res.DW
        }
        this.chart.getLineChart('waterlevelChart', res.DataList, config);
      });

    });


  }
  goWellPumpQuery() {
    this.navCtrl.push('WellpumpqueryPage', { queryID: -3, type: 'wp' })
  }
  presentShowModal() {
    let profileModal = this.modalCtrl.create('TimerPumpPage', { name: this.name });
    profileModal.onDidDismiss(data => {
    });
    profileModal.present();
  }
  /**start**/
  private eventsFnAutoHandler = (data: any) => {
    this.auto = data;
  }
  private eventsFn51Handler = (data: any) => {
    this.getDeviceState(data);
  }
  private eventsFn50Handler = (data: any) => {
    this.f50Data = data;
  }
  private eventsFn52Handler = (data: any) => {
    let value = this.getWaterlevelData(data);
    this.levelData[0].value = value;
    this.changeData();

  }
  /**end***/
}
