import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
// import { WellpumpqueryPage } from '../wellpumpquery/wellpumpquery';


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
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private app: App) {
    this.list = this.navParams.get('list');
  }

  ionViewDidLoad() {

  }
  goPage(data: any) {
    this.viewCtrl.dismiss();
    this.app.getActiveNav().push(data.page, { name: data.name, type: data.type ,data:data.data});

  }

}
