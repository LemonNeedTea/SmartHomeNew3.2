import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModeCurtainTimerPage } from './mode-curtain-timer';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    ModeCurtainTimerPage,
  ],
  imports: [
    IonicPageModule.forChild(ModeCurtainTimerPage),
    ComponentsModule
  ],
})
export class ModeCurtainTimerPageModule {}
