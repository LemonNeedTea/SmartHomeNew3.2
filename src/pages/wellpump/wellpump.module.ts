import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WellpumpPage } from './wellpump';
import { ComponentsModule } from '../../components/components.module'

@NgModule({
  declarations: [
    WellpumpPage,
  ],
  imports: [
    IonicPageModule.forChild(WellpumpPage),
    ComponentsModule,
  ],
})
export class WellpumpPageModule {}
