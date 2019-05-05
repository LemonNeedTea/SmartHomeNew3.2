import { NgModule } from '@angular/core';
import { IonicPageModule,IonicModule } from 'ionic-angular';
import { ValveNorthpoolSettingPage } from './valve-northpool-setting';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    ValveNorthpoolSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(ValveNorthpoolSettingPage),
    ComponentsModule
  ],

})
export class ValveNorthpoolSettingPageModule { }
