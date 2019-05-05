import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WellpumpqueryPage } from './wellpumpquery';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    WellpumpqueryPage,
  ],
  imports: [
    IonicPageModule.forChild(WellpumpqueryPage),
    ComponentsModule
  ],
})
export class WellpumpqueryPageModule {}
