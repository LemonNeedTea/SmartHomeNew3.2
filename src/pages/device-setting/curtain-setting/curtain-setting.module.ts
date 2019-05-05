import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurtainSettingPage } from './curtain-setting';
import { ComponentsModule } from '../../../components/components.module';


@NgModule({
  declarations: [
    CurtainSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(CurtainSettingPage),
    ComponentsModule
  ],
})
export class CurtainSettingPageModule {}
