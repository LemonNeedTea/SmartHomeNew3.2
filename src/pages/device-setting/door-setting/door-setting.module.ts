import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoorSettingPage } from './door-setting';
import { ComponentsModule } from '../../../components/components.module';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    DoorSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(DoorSettingPage),
    ComponentsModule, TranslateModule
  ],
})
export class DoorSettingPageModule {}
