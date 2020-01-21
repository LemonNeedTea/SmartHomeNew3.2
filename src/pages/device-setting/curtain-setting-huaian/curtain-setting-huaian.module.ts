import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurtainSettingHuaianPage } from './curtain-setting-huaian';
import { ComponentsModule } from '../../../components/components.module';
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  declarations: [
    CurtainSettingHuaianPage,
  ],
  imports: [
    IonicPageModule.forChild(CurtainSettingHuaianPage),
    ComponentsModule,
    TranslateModule
  ],
})
export class CurtainSettingHuaianPageModule { }
