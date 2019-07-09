import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnvironmentalPage } from './environmental';

@NgModule({
  declarations: [
    EnvironmentalPage,
  ],
  imports: [
    IonicPageModule.forChild(EnvironmentalPage),
  ],
})
export class EnvironmentalPageModule {}
