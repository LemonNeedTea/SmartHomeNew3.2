import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModeDeviceSelectedSettingPage } from './mode-device-selected-setting';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    ModeDeviceSelectedSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(ModeDeviceSelectedSettingPage),
    TranslateModule
  ],
})
export class ModeDeviceSelectedSettingPageModule {}
