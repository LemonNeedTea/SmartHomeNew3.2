import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LinechartPage } from './linechart';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    LinechartPage,
  ],
  imports: [
    IonicPageModule.forChild(LinechartPage),
    ComponentsModule
  ],
})
export class LinechartPageModule {}
