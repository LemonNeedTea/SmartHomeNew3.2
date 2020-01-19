import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModeSettingPage } from './mode-setting';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    ModeSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(ModeSettingPage),
    TranslateModule

  ],
})
export class ModeSettingPageModule {}
