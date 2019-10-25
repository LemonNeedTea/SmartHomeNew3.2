import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeviceCurtainTimerPage } from './device-curtain-timer';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    DeviceCurtainTimerPage,
  ],
  imports: [
    IonicPageModule.forChild(DeviceCurtainTimerPage),
    ComponentsModule
  ],
})
export class DeviceCurtainTimerPageModule { }
