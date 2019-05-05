import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimerPumpPage } from './timer-pump';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    TimerPumpPage,
  ],
  imports: [
    IonicPageModule.forChild(TimerPumpPage),ComponentsModule
  ],
})
export class TimerPumpPageModule {}
