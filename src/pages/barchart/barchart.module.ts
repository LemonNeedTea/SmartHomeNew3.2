import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BarchartPage } from './barchart';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    BarchartPage,
  ],
  imports: [
    IonicPageModule.forChild(BarchartPage),ComponentsModule
  ],
})
export class BarchartPageModule {}
