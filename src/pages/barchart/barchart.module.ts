import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BarchartPage } from './barchart';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    BarchartPage,
  ],
  imports: [
    IonicPageModule.forChild(BarchartPage),ComponentsModule,
    TranslateModule
  ],
})
export class BarchartPageModule {}
