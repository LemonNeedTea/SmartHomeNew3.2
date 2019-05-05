import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ValveEastcourtTimerPage } from './valve-eastcourt-timer';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    ValveEastcourtTimerPage,
  ],
  imports: [
    IonicPageModule.forChild(ValveEastcourtTimerPage),ComponentsModule
  ],
})
export class ValveEastcourtTimerPageModule {}
