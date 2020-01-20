import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LinechartPage } from './linechart';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    LinechartPage,
  ],
  imports: [
    IonicPageModule.forChild(LinechartPage),
    ComponentsModule,
    TranslateModule
  ],
})
export class LinechartPageModule {}
