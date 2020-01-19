import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AirSettingSelfPage } from './air-setting-self';
import { ComponentsModule } from '../../../components/components.module';
import { MultiPickerModule } from 'ion-multi-picker';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    AirSettingSelfPage,
  ],
  imports: [
    IonicPageModule.forChild(AirSettingSelfPage),
    ComponentsModule,
    MultiPickerModule,
    TranslateModule
  ],
})
export class AirSettingSelfPageModule {}
