import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AirSettingPage } from './air-setting';
import { ComponentsModule } from '../../../components/components.module';
import { MultiPickerModule } from 'ion-multi-picker';
@NgModule({
  declarations: [
    AirSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(AirSettingPage),
    ComponentsModule,
    MultiPickerModule
  ],
})
export class AirSettingPageModule {}
