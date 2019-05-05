import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModeAirseasonsonTimerPage } from './mode-airseasonson-timer';
import { ComponentsModule } from '../../../components/components.module';


@NgModule({
  declarations: [
    ModeAirseasonsonTimerPage,
  ],
  imports: [
    IonicPageModule.forChild(ModeAirseasonsonTimerPage),
    ComponentsModule
  ],
})
export class ModeAirseasonsonTimerPageModule {}
