import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnergyPage } from './energy';

@NgModule({
  declarations: [
    EnergyPage,
  ],
  imports: [
    IonicPageModule.forChild(EnergyPage),
  ],
})
export class EnergyPageModule {}
