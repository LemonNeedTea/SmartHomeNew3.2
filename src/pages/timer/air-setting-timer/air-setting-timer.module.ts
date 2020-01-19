import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AirSettingTimerPage } from './air-setting-timer';
import { ComponentsModule } from '../../../components/components.module';
import { MultiPickerModule } from 'ion-multi-picker';
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  declarations: [
    AirSettingTimerPage,
  ],
  imports: [
    IonicPageModule.forChild(AirSettingTimerPage), ComponentsModule,
    MultiPickerModule,
    TranslateModule
  ],
})
export class AirSettingTimerPageModule { }
