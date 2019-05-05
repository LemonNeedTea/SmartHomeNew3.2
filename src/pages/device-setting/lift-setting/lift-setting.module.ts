import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LiftSettingPage } from './lift-setting';

@NgModule({
  declarations: [
    LiftSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(LiftSettingPage),
  ],
})
export class LiftSettingPageModule {}
