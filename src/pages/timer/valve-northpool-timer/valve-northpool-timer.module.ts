import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ValveNorthpoolTimerPage } from './valve-northpool-timer';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    ValveNorthpoolTimerPage,
  ],
  imports: [
    IonicPageModule.forChild(ValveNorthpoolTimerPage),
    ComponentsModule
  ],
})
export class ValveNorthpoolTimerPageModule {}
