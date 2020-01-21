import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurtainSettingPage } from './curtain-setting';
import { ComponentsModule } from '../../../components/components.module';
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  declarations: [
    CurtainSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(CurtainSettingPage),
    ComponentsModule,TranslateModule
  ],
})
export class CurtainSettingPageModule {}
