import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AirSettingModePage } from './air-setting-mode';

@NgModule({
  declarations: [
    AirSettingModePage,
  ],
  imports: [
    IonicPageModule.forChild(AirSettingModePage),
  ],
})
export class AirSettingModePageModule {}
