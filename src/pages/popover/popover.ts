import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
// import { WellpumpqueryPage } from '../wellpumpquery/wellpumpquery';
import{ ConfigProvider } from '../../providers/config/config';


/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html'
})
export class PopoverPage {
  list: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private app: App,
    public config: ConfigProvider) {
    this.list = this.navParams.get('list');
    
  }

  ionViewDidLoad() {

  }
  goPage(data: any) {
    this.viewCtrl.dismiss();
    this.app.getActiveNav().push(data.F_Url, {Data:data});

  }

}
