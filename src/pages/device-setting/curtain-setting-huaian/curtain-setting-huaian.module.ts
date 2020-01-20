import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurtainSettingHuaianPage } from './curtain-setting-huaian';
import { ComponentsModule } from '../../../components/components.module';
import { TranslateService } from "@ngx-translate/core";


@NgModule({
  declarations: [
    CurtainSettingHuaianPage,
  ],
  imports: [
    IonicPageModule.forChild(CurtainSettingHuaianPage),
    ComponentsModule,
    TranslateService
  ],
})
export class CurtainSettingHuaianPageModule { }
