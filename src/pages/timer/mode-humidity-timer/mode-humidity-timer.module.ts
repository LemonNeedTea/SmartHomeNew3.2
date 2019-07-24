import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModeHumidityTimerPage } from './mode-humidity-timer';

@NgModule({
  declarations: [
    ModeHumidityTimerPage,
  ],
  imports: [
    IonicPageModule.forChild(ModeHumidityTimerPage),
  ],
})
export class ModeHumidityTimerPageModule {}
