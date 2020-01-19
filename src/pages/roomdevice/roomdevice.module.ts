import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomdevicePage } from './roomdevice';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    RoomdevicePage,
  ],
  imports: [
    IonicPageModule.forChild(RoomdevicePage),
    TranslateModule
  ],
})
export class RoomdevicePageModule {}
