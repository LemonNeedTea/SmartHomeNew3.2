import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LightSettingPage } from './light-setting';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    LightSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(LightSettingPage),
    ComponentsModule
  ],
})
export class LightSettingPageModule {}
