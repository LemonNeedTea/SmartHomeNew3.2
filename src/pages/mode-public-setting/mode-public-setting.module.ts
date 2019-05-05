import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModePublicSettingPage } from './mode-public-setting';

@NgModule({
  declarations: [
    ModePublicSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(ModePublicSettingPage),
  ],
})
export class ModePublicSettingPageModule {}
