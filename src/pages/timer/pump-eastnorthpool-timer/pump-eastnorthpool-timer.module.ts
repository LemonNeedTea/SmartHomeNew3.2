import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PumpEastnorthpoolTimerPage } from './pump-eastnorthpool-timer';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    PumpEastnorthpoolTimerPage,
  ],
  imports: [
    IonicPageModule.forChild(PumpEastnorthpoolTimerPage),ComponentsModule
  ],
})
export class PumpEastnorthpoolTimerPageModule {}
