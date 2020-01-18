import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AirSettingMorePage } from './air-setting-more';
import { MultiPickerModule } from 'ion-multi-picker';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    AirSettingMorePage,
  ],
  imports: [
    IonicPageModule.forChild(AirSettingMorePage),
    MultiPickerModule,
    TranslateModule

  ],
})
export class AirSettingMorePageModule {}
