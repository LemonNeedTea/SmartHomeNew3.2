import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModeLightTimerPage } from './mode-light-timer';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    ModeLightTimerPage,
  ],
  imports: [
    IonicPageModule.forChild(ModeLightTimerPage),ComponentsModule
  ],
})
export class ModeLightTimerPageModule {}
