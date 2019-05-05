import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ValveEastpoolTimerPage } from './valve-eastpool-timer';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    ValveEastpoolTimerPage,
  ],
  imports: [
    IonicPageModule.forChild(ValveEastpoolTimerPage),
    ComponentsModule
  ],
})
export class ValveEastpoolTimerPageModule {}
