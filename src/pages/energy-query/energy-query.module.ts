import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnergyQueryPage } from './energy-query';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    EnergyQueryPage,
  ],
  imports: [
    IonicPageModule.forChild(EnergyQueryPage),ComponentsModule
  ],
})
export class EnergyQueryPageModule {}
