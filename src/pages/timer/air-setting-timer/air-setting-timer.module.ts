import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AirSettingTimerPage } from './air-setting-timer';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    AirSettingTimerPage,
  ],
  imports: [
    IonicPageModule.forChild(AirSettingTimerPage), ComponentsModule
  ],
})
export class AirSettingTimerPageModule { }
