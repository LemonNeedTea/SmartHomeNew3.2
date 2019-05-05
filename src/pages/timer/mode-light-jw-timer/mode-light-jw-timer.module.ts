import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModeLightJwTimerPage } from './mode-light-jw-timer';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    ModeLightJwTimerPage,
  ],
  imports: [
    IonicPageModule.forChild(ModeLightJwTimerPage),
    ComponentsModule
  ],
})
export class ModeLightJwTimerPageModule {}
