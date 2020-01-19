import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnergyQueryPage } from './energy-query';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from "@ngx-translate/core";




@NgModule({
  declarations: [
    EnergyQueryPage,
  ],
  imports: [
    IonicPageModule.forChild(EnergyQueryPage),ComponentsModule,
    TranslateModule
  ],
})
export class EnergyQueryPageModule {}
