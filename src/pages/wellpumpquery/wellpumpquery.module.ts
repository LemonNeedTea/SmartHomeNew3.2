import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WellpumpqueryPage } from './wellpumpquery';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule  } from "@ngx-translate/core";

@NgModule({
  declarations: [
    WellpumpqueryPage,
  ],
  imports: [
    IonicPageModule.forChild(WellpumpqueryPage),
    ComponentsModule,TranslateModule
  ],
})
export class WellpumpqueryPageModule {}
