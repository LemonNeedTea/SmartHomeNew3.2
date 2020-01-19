import { NgModule } from '@angular/core';
import { MyTitleComponent } from './my-title/my-title';
import { IonicModule } from 'ionic-angular';
import { MyLoopComponent } from './my-loop/my-loop';
import { MyRuntimeComponent } from './my-runtime/my-runtime';
import { MyTimeComponent } from './my-time/my-time';
import { MyDeviceInfoComponent } from './my-device-info/my-device-info'; 
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
	declarations: [MyTitleComponent,
    MyLoopComponent,
    MyRuntimeComponent,
    MyTimeComponent,
    MyDeviceInfoComponent],
    imports: [IonicModule, TranslateModule],
	exports: [MyTitleComponent,
    MyLoopComponent,
    MyRuntimeComponent,
    MyTimeComponent,
    MyDeviceInfoComponent],
})
export class ComponentsModule {}
