import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModeSettingPage } from './mode-setting';

@NgModule({
  declarations: [
    ModeSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(ModeSettingPage),
  ],
})
export class ModeSettingPageModule {}
