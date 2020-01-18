import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AirSettingPage } from './air-setting';
import { ComponentsModule } from '../../../components/components.module';
import { MultiPickerModule } from 'ion-multi-picker';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    AirSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(AirSettingPage),
    ComponentsModule,
    MultiPickerModule,
    TranslateModule
  ],
})
export class AirSettingPageModule {}
