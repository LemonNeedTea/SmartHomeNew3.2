import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PumpNorthcourtTimerPage } from './pump-northcourt-timer';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    PumpNorthcourtTimerPage,
  ],
  imports: [
    IonicPageModule.forChild(PumpNorthcourtTimerPage),ComponentsModule
  ],
})
export class PumpNorthcourtTimerPageModule {}
