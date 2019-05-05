import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ValveEastnorthpoolTimerPage } from './valve-eastnorthpool-timer';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    ValveEastnorthpoolTimerPage,
  ],
  imports: [
    IonicPageModule.forChild(ValveEastnorthpoolTimerPage),ComponentsModule
  ],
})
export class ValveEastnorthpoolTimerPageModule {}
