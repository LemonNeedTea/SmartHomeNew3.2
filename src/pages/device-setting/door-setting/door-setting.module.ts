import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoorSettingPage } from './door-setting';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    DoorSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(DoorSettingPage),
    ComponentsModule
  ],
})
export class DoorSettingPageModule {}
