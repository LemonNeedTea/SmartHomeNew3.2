import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AirSettingMorePage } from './air-setting-more';
import { MultiPickerModule } from 'ion-multi-picker';

@NgModule({
  declarations: [
    AirSettingMorePage,
  ],
  imports: [
    IonicPageModule.forChild(AirSettingMorePage),
    MultiPickerModule
  ],
})
export class AirSettingMorePageModule {}
